import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GraphyWebhookPayload {
  // Standard webhook format
  event?: string;
  type?: string;
  data?: {
    learner?: {
      id?: string;
      email?: string;
      name?: string;
    };
    user?: {
      id?: string;
      email?: string;
      name?: string;
    };
    product?: {
      id?: string;
      name?: string;
    };
    course?: {
      id?: string;
      name?: string;
    };
    transaction_id?: string;
    order_id?: string;
    amount?: string;
    progress_percent?: number;
    item_name?: string;
  };
  learner_email?: string;
  user_email?: string;
  email?: string;
  learner_id?: string;
  product_id?: string;
  course_id?: string;
  // Graphy's actual format with space-separated field names
  "Learner Name"?: string;
  "Learner Email"?: string;
  "Learner Mobile"?: string;
  "Course Name"?: string;
  "Course Link"?: string;
  "Assigned Through"?: string;
  "Assigned Through Id"?: string;
  "Course Validity"?: string;
  // Progress/Completion fields
  "Item Name"?: string;
  "Progress Percent"?: number;
  "Completion Date"?: string;
  // Transaction fields
  "Transaction Id"?: string;
  "Amount"?: string;
  "Transaction Status"?: string;
}

// Detect event type from payload content
function detectEventType(payload: GraphyWebhookPayload): string {
  // Check for explicit event type first
  if (payload.event || payload.type) {
    return (payload.event || payload.type || "").toLowerCase();
  }
  
  // Check for completion indicators
  if (payload["Completion Date"] || payload["Progress Percent"] === 100) {
    return "course_completion";
  }
  
  // Check for progress/item completion
  if (payload["Item Name"] || payload["Progress Percent"] !== undefined) {
    return "item_completion";
  }
  
  // Check for transaction initialization (has transaction but no success indicators)
  if (payload["Transaction Id"] && payload["Transaction Status"]?.toLowerCase() === "initiated") {
    return "init_transaction";
  }
  
  // Check if this is Graphy format with learner data - treat as enrollment
  if (payload["Learner Email"] || payload["Learner Name"]) {
    return "new_enrollment";
  }
  
  return "unknown";
}

// Extract email from various payload formats
function extractEmail(payload: GraphyWebhookPayload): string | undefined {
  return (
    payload["Learner Email"] ||
    payload.data?.learner?.email ||
    payload.data?.user?.email ||
    payload.learner_email ||
    payload.user_email ||
    payload.email
  );
}

// Handle new enrollment events
async function handleEnrollment(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Enrollment ===");
  
  const graphyLearnerId = 
    payload.data?.learner?.id ||
    payload.data?.user?.id ||
    payload.learner_id;

  // Find pending enrollment by email
  const { data: pendingEnrollments, error: fetchError } = await supabase
    .from("course_enrollments")
    .select("id, email, status, course_id")
    .eq("email", learnerEmail.toLowerCase())
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (fetchError) {
    console.error("Error fetching enrollments:", fetchError);
    throw new Error("Database fetch error");
  }

  if (!pendingEnrollments || pendingEnrollments.length === 0) {
    console.log("No pending enrollment found for email:", learnerEmail);
    return { success: true, message: "No pending enrollment found" };
  }

  console.log(`Found ${pendingEnrollments.length} pending enrollment(s)`);

  // Update the most recent pending enrollment
  const enrollmentToUpdate = pendingEnrollments[0];
  
  const { error: updateError } = await supabase
    .from("course_enrollments")
    .update({
      status: "enrolled",
      graphy_sync_status: "synced",
      graphy_learner_id: graphyLearnerId || null,
      graphy_enrolled_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", enrollmentToUpdate.id);

  if (updateError) {
    console.error("Error updating enrollment:", updateError);
    throw new Error("Database update error");
  }

  console.log("Enrollment updated successfully:", enrollmentToUpdate.id);
  return { 
    success: true, 
    message: "Enrollment updated successfully",
    enrollment_id: enrollmentToUpdate.id 
  };
}

// Handle course item completion (lesson progress)
async function handleItemCompletion(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Item Completion ===");
  
  const itemName = payload["Item Name"] || payload.data?.item_name;
  const progressPercent = payload["Progress Percent"] ?? payload.data?.progress_percent;
  const courseName = payload["Course Name"] || payload.data?.course?.name;
  
  console.log("Item:", itemName, "Progress:", progressPercent, "%");

  // Find enrolled student
  const { data: enrollments, error: fetchError } = await supabase
    .from("course_enrollments")
    .select("id, course_id, student_name")
    .eq("email", learnerEmail.toLowerCase())
    .in("status", ["enrolled", "in_progress"])
    .order("created_at", { ascending: false });

  if (fetchError) {
    console.error("Error fetching enrollments:", fetchError);
    throw new Error("Database fetch error");
  }

  if (!enrollments || enrollments.length === 0) {
    console.log("No active enrollment found for:", learnerEmail);
    return { success: true, message: "No active enrollment found" };
  }

  const enrollment = enrollments[0];

  // Update or insert progress in graphy_progress table
  const { data: existingProgress, error: progressFetchError } = await supabase
    .from("graphy_progress")
    .select("id, progress_percent")
    .eq("enrollment_id", enrollment.id)
    .maybeSingle();

  if (progressFetchError) {
    console.error("Error fetching progress:", progressFetchError);
  }

  if (existingProgress) {
    // Update existing progress
    await supabase
      .from("graphy_progress")
      .update({
        progress_percent: progressPercent,
        last_synced_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingProgress.id);
  } else {
    // Insert new progress record
    await supabase
      .from("graphy_progress")
      .insert({
        enrollment_id: enrollment.id,
        progress_percent: progressPercent || 0,
        last_synced_at: new Date().toISOString(),
      });
  }

  // Record milestone if item was completed
  if (itemName) {
    await supabase
      .from("enrollment_milestones")
      .insert({
        enrollment_id: enrollment.id,
        milestone_type: "lesson_complete",
        item_name: itemName,
        progress_percent: progressPercent,
        achieved_at: new Date().toISOString(),
      });
    console.log("Milestone recorded for:", itemName);
  }

  // Check for progress milestones (25%, 50%, 75%)
  if (progressPercent && existingProgress) {
    const oldPercent = existingProgress.progress_percent || 0;
    const milestones = [25, 50, 75];
    
    for (const milestone of milestones) {
      if (oldPercent < milestone && progressPercent >= milestone) {
        await supabase
          .from("enrollment_milestones")
          .insert({
            enrollment_id: enrollment.id,
            milestone_type: `progress_${milestone}`,
            progress_percent: progressPercent,
            achieved_at: new Date().toISOString(),
          });
        console.log(`Progress milestone ${milestone}% achieved!`);
      }
    }
  }

  // Update enrollment status to in_progress if first progress
  if (enrollment.status === "enrolled") {
    await supabase
      .from("course_enrollments")
      .update({ status: "in_progress", updated_at: new Date().toISOString() })
      .eq("id", enrollment.id);
  }

  return { 
    success: true, 
    message: "Progress updated",
    enrollment_id: enrollment.id,
    progress_percent: progressPercent
  };
}

// Handle course completion
async function handleCourseCompletion(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Course Completion ===");
  
  const completionDate = payload["Completion Date"] || new Date().toISOString();
  const courseName = payload["Course Name"] || payload.data?.course?.name;
  const learnerName = payload["Learner Name"] || payload.data?.learner?.name;
  
  console.log("Course completed:", courseName, "by", learnerName);

  // Find enrolled student
  const { data: enrollments, error: fetchError } = await supabase
    .from("course_enrollments")
    .select("id, course_id, student_name")
    .eq("email", learnerEmail.toLowerCase())
    .in("status", ["enrolled", "in_progress"])
    .order("created_at", { ascending: false });

  if (fetchError) {
    console.error("Error fetching enrollments:", fetchError);
    throw new Error("Database fetch error");
  }

  if (!enrollments || enrollments.length === 0) {
    console.log("No active enrollment found for:", learnerEmail);
    return { success: true, message: "No active enrollment found" };
  }

  const enrollment = enrollments[0];

  // Update enrollment to completed
  const { error: updateError } = await supabase
    .from("course_enrollments")
    .update({
      status: "completed",
      completed_at: completionDate,
      updated_at: new Date().toISOString(),
    })
    .eq("id", enrollment.id);

  if (updateError) {
    console.error("Error updating enrollment:", updateError);
    throw new Error("Database update error");
  }

  // Update progress to 100%
  await supabase
    .from("graphy_progress")
    .upsert({
      enrollment_id: enrollment.id,
      progress_percent: 100,
      last_synced_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "enrollment_id" });

  // Record completion milestone
  await supabase
    .from("enrollment_milestones")
    .insert({
      enrollment_id: enrollment.id,
      milestone_type: "progress_100",
      progress_percent: 100,
      achieved_at: completionDate,
    });

  console.log("Course completion recorded for enrollment:", enrollment.id);
  
  return { 
    success: true, 
    message: "Course completion recorded",
    enrollment_id: enrollment.id,
    completed_at: completionDate
  };
}

// Handle init transaction (abandoned cart tracking)
async function handleInitTransaction(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Init Transaction ===");
  
  const transactionId = payload["Transaction Id"] || payload.data?.transaction_id;
  const amount = payload["Amount"] || payload.data?.amount;
  const courseName = payload["Course Name"] || payload.data?.course?.name;
  const learnerName = payload["Learner Name"] || payload.data?.learner?.name;
  
  console.log("Transaction initiated:", transactionId, "Amount:", amount);

  // Check if this transaction already exists
  const { data: existingTransaction, error: fetchError } = await supabase
    .from("abandoned_transactions")
    .select("id, status")
    .eq("graphy_transaction_id", transactionId)
    .maybeSingle();

  if (fetchError) {
    console.error("Error checking transaction:", fetchError);
  }

  if (existingTransaction) {
    console.log("Transaction already tracked:", transactionId);
    return { success: true, message: "Transaction already tracked" };
  }

  // Insert new abandoned transaction record
  const { error: insertError } = await supabase
    .from("abandoned_transactions")
    .insert({
      email: learnerEmail.toLowerCase(),
      learner_name: learnerName,
      course_name: courseName,
      graphy_transaction_id: transactionId,
      amount: amount,
      status: "initiated",
      initiated_at: new Date().toISOString(),
    });

  if (insertError) {
    console.error("Error inserting transaction:", insertError);
    throw new Error("Database insert error");
  }

  console.log("Transaction tracked for follow-up:", transactionId);
  
  return { 
    success: true, 
    message: "Transaction tracked",
    transaction_id: transactionId
  };
}

// Handle successful transaction (mark abandoned transaction as completed)
async function handleSuccessTransaction(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Success Transaction ===");
  
  const transactionId = payload["Transaction Id"] || payload.data?.transaction_id;
  
  // Mark any matching abandoned transaction as completed
  if (transactionId) {
    await supabase
      .from("abandoned_transactions")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("graphy_transaction_id", transactionId);
    
    console.log("Marked transaction as completed:", transactionId);
  }
  
  // Also process as enrollment
  return handleEnrollment(supabase, payload, learnerEmail);
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse webhook payload
    const payload: GraphyWebhookPayload = await req.json();
    
    console.log("=== Graphy Webhook Received ===");
    console.log("Full payload:", JSON.stringify(payload, null, 2));

    // Detect event type from payload
    const eventType = detectEventType(payload);
    console.log("Detected event type:", eventType);

    // Extract learner email
    const learnerEmail = extractEmail(payload);
    
    if (!learnerEmail) {
      console.error("No learner email found in payload");
      return new Response(
        JSON.stringify({ success: false, error: "No learner email in payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing for email:", learnerEmail);

    let result;

    // Route to appropriate handler based on event type
    switch (eventType) {
      case "new_enrollment":
      case "enrollment_created":
        result = await handleEnrollment(supabase, payload, learnerEmail);
        break;
        
      case "success_transaction":
      case "payment_success":
      case "order_completed":
      case "purchase_completed":
        result = await handleSuccessTransaction(supabase, payload, learnerEmail);
        break;
        
      case "item_completion":
      case "course_item_completion":
      case "lesson_complete":
        result = await handleItemCompletion(supabase, payload, learnerEmail);
        break;
        
      case "course_completion":
      case "course_complete":
        result = await handleCourseCompletion(supabase, payload, learnerEmail);
        break;
        
      case "init_transaction":
      case "transaction_initiated":
        result = await handleInitTransaction(supabase, payload, learnerEmail);
        break;
        
      default:
        console.log(`Event type '${eventType}' not specifically handled, treating as enrollment`);
        result = await handleEnrollment(supabase, payload, learnerEmail);
    }

    console.log("=== Webhook Processing Complete ===");
    console.log("Result:", result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
