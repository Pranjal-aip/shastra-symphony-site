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
      mobile?: string;
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
  "Order Id"?: string;
  "Payment Method"?: string;
  "Currency"?: string;
  "Discount Applied"?: string;
  
  // New Learner Created fields
  "Created At"?: string;
  "Signup Source"?: string;
  
  // Profile Update fields
  "Updated Fields"?: string[];
  "Old Values"?: Record<string, string>;
  "New Values"?: Record<string, string>;
  
  // New Course Published fields
  "Course Id"?: string;
  "Published At"?: string;
  "Course Type"?: string;
  
  // Marketing Consent fields
  "Consent Type"?: string;
  "Consent Status"?: boolean;
  "Consent Timestamp"?: string;
  
  // Certificate fields
  "Certificate URL"?: string;
  "Certificate Id"?: string;
  "Download Timestamp"?: string;
  
  // Video Processing fields
  "Video Id"?: string;
  "Processing Status"?: string;
  "Video Title"?: string;
  
  // Subscriber fields
  "Subscriber Name"?: string;
  "Subscriber Email"?: string;
  "Subscriber Mobile"?: string;
  "Source"?: string;
}

// Detect event type from payload content
function detectEventType(payload: GraphyWebhookPayload): string {
  // Check for explicit event type first
  if (payload.event || payload.type) {
    const eventType = (payload.event || payload.type || "").toLowerCase().replace(/\s+/g, "_");
    
    // Map Graphy event names to our handlers
    const eventMap: Record<string, string> = {
      "new_learner_created": "new_learner",
      "new_learner": "new_learner",
      "learner_profile_updated": "profile_updated",
      "profile_updated": "profile_updated",
      "new_course_published": "course_published",
      "course_published": "course_published",
      "new_subscriber": "new_subscriber",
      "marketing_consent": "marketing_consent",
      "certificate_downloaded": "certificate_downloaded",
      "video_upload_processed": "video_processed",
      "video_processed": "video_processed",
      "success_transaction_v2": "success_transaction_v2",
      "course_progress": "course_progress",
      "new_enrollment": "new_enrollment",
      "success_transaction": "success_transaction",
      "course_completion": "course_completion",
      "course_item_completion": "item_completion",
      "item_completion": "item_completion",
      "init_transaction": "init_transaction",
    };
    
    return eventMap[eventType] || eventType;
  }
  
  // Content-based detection
  if (payload["Certificate URL"] || payload["Certificate Id"]) {
    return "certificate_downloaded";
  }
  if (payload["Video Id"] && payload["Processing Status"]) {
    return "video_processed";
  }
  if (payload["Consent Type"] !== undefined || payload["Consent Status"] !== undefined) {
    return "marketing_consent";
  }
  if (payload["Published At"] && (payload["Course Id"] || payload["Course Name"])) {
    return "course_published";
  }
  if (payload["Updated Fields"] || payload["New Values"]) {
    return "profile_updated";
  }
  if (payload["Subscriber Email"] || payload["Subscriber Name"]) {
    return "new_subscriber";
  }
  if (payload["Created At"] && payload["Signup Source"]) {
    return "new_learner";
  }
  
  // Check for completion indicators
  if (payload["Completion Date"] || payload["Progress Percent"] === 100) {
    return "course_completion";
  }
  
  // Check for progress/item completion
  if (payload["Item Name"] || (payload["Progress Percent"] !== undefined && payload["Progress Percent"] < 100)) {
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
    payload["Subscriber Email"] ||
    payload.data?.learner?.email ||
    payload.data?.user?.email ||
    payload.learner_email ||
    payload.user_email ||
    payload.email
  );
}

// Handle new learner created
async function handleNewLearner(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing New Learner ===");
  
  const learnerName = payload["Learner Name"] || payload.data?.learner?.name;
  const learnerMobile = payload["Learner Mobile"] || payload.data?.learner?.mobile;
  const graphyLearnerId = payload.data?.learner?.id || payload.learner_id;
  const signupSource = payload["Signup Source"] || payload["Assigned Through"];
  const createdAt = payload["Created At"] || new Date().toISOString();
  
  console.log("New learner:", learnerName, "Email:", learnerEmail);

  // Check if learner already exists
  const { data: existingLearner, error: fetchError } = await supabase
    .from("graphy_learners")
    .select("id")
    .eq("email", learnerEmail.toLowerCase())
    .maybeSingle();

  if (fetchError) {
    console.error("Error checking learner:", fetchError);
  }

  if (existingLearner) {
    console.log("Learner already exists:", learnerEmail);
    return { success: true, message: "Learner already exists" };
  }

  // Insert new learner
  const { error: insertError } = await supabase
    .from("graphy_learners")
    .insert({
      email: learnerEmail.toLowerCase(),
      name: learnerName,
      mobile: learnerMobile,
      graphy_learner_id: graphyLearnerId,
      signup_source: signupSource,
      profile_data: payload,
      created_at: createdAt,
    });

  if (insertError) {
    console.error("Error inserting learner:", insertError);
    throw new Error("Database insert error");
  }

  console.log("New learner created:", learnerEmail);
  return { success: true, message: "Learner created", email: learnerEmail };
}

// Handle learner profile update
async function handleProfileUpdate(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Profile Update ===");
  
  const learnerName = payload["Learner Name"] || payload.data?.learner?.name;
  const learnerMobile = payload["Learner Mobile"] || payload.data?.learner?.mobile;
  const updatedFields = payload["Updated Fields"];
  const newValues = payload["New Values"];
  
  console.log("Profile update for:", learnerEmail, "Fields:", updatedFields);

  // Update in graphy_learners table
  const { error: updateLearnerError } = await supabase
    .from("graphy_learners")
    .upsert({
      email: learnerEmail.toLowerCase(),
      name: learnerName,
      mobile: learnerMobile,
      profile_data: {
        ...payload,
        last_updated: new Date().toISOString(),
        update_history: updatedFields,
      },
      updated_at: new Date().toISOString(),
    }, { onConflict: "email" });

  if (updateLearnerError) {
    console.error("Error updating learner:", updateLearnerError);
  }

  // Also update course_enrollments if name or phone changed
  if (learnerName || learnerMobile) {
    const updateData: Record<string, any> = { updated_at: new Date().toISOString() };
    if (learnerName) updateData.student_name = learnerName;
    if (learnerMobile) updateData.phone = learnerMobile;

    await supabase
      .from("course_enrollments")
      .update(updateData)
      .eq("email", learnerEmail.toLowerCase());
  }

  console.log("Profile updated for:", learnerEmail);
  return { success: true, message: "Profile updated", email: learnerEmail };
}

// Handle new course published
async function handleCoursePublished(supabase: any, payload: GraphyWebhookPayload) {
  console.log("=== Processing Course Published ===");
  
  const courseId = payload["Course Id"] || payload.course_id || payload.data?.course?.id;
  const courseName = payload["Course Name"] || payload.data?.course?.name;
  const courseLink = payload["Course Link"];
  const publishedAt = payload["Published At"] || new Date().toISOString();
  const courseType = payload["Course Type"];
  
  console.log("New course published:", courseName, "ID:", courseId);

  // Check if course already exists
  const { data: existingCourse, error: fetchError } = await supabase
    .from("graphy_courses")
    .select("id")
    .eq("graphy_course_id", courseId)
    .maybeSingle();

  if (fetchError) {
    console.error("Error checking course:", fetchError);
  }

  if (existingCourse) {
    // Update existing course
    await supabase
      .from("graphy_courses")
      .update({
        title: courseName,
        course_link: courseLink,
        published_at: publishedAt,
        metadata: { ...payload, course_type: courseType },
        updated_at: new Date().toISOString(),
      })
      .eq("graphy_course_id", courseId);
    
    console.log("Course updated:", courseId);
    return { success: true, message: "Course updated", course_id: courseId };
  }

  // Insert new course
  const { error: insertError } = await supabase
    .from("graphy_courses")
    .insert({
      graphy_course_id: courseId,
      title: courseName,
      course_link: courseLink,
      published_at: publishedAt,
      metadata: { ...payload, course_type: courseType },
    });

  if (insertError) {
    console.error("Error inserting course:", insertError);
    throw new Error("Database insert error");
  }

  console.log("New course created:", courseName);
  return { success: true, message: "Course created", course_id: courseId };
}

// Handle new subscriber
async function handleNewSubscriber(supabase: any, payload: GraphyWebhookPayload) {
  console.log("=== Processing New Subscriber ===");
  
  const email = payload["Subscriber Email"] || payload["Learner Email"] || payload.email;
  const name = payload["Subscriber Name"] || payload["Learner Name"];
  const mobile = payload["Subscriber Mobile"] || payload["Learner Mobile"];
  const source = payload["Source"] || "contact_form";
  
  console.log("New subscriber:", email, "from:", source);

  if (!email) {
    console.error("No email found for subscriber");
    return { success: false, message: "No email provided" };
  }

  // Insert new subscriber
  const { error: insertError } = await supabase
    .from("graphy_subscribers")
    .insert({
      email: email.toLowerCase(),
      name: name,
      mobile: mobile,
      source: source,
      subscribed_at: new Date().toISOString(),
    });

  if (insertError) {
    console.error("Error inserting subscriber:", insertError);
    throw new Error("Database insert error");
  }

  console.log("Subscriber added:", email);
  return { success: true, message: "Subscriber added", email: email };
}

// Handle success transaction v2 (enhanced format)
async function handleSuccessTransactionV2(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Success Transaction V2 ===");
  
  const transactionId = payload["Transaction Id"] || payload.data?.transaction_id;
  const orderId = payload["Order Id"] || payload.data?.order_id;
  const amount = payload["Amount"] || payload.data?.amount;
  const paymentMethod = payload["Payment Method"];
  const currency = payload["Currency"];
  const discount = payload["Discount Applied"];
  
  console.log("Transaction V2:", transactionId, "Order:", orderId, "Amount:", amount, currency);

  // Mark any matching abandoned transaction as completed
  if (transactionId || orderId) {
    const { error: updateError } = await supabase
      .from("abandoned_transactions")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .or(`graphy_transaction_id.eq.${transactionId},graphy_transaction_id.eq.${orderId}`);
    
    if (updateError) {
      console.error("Error updating transaction:", updateError);
    } else {
      console.log("Marked transaction as completed:", transactionId || orderId);
    }
  }
  
  // Also process as enrollment
  return handleEnrollment(supabase, payload, learnerEmail);
}

// Handle marketing consent
async function handleMarketingConsent(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Marketing Consent ===");
  
  const consentType = payload["Consent Type"];
  const consentStatus = payload["Consent Status"] ?? true;
  const consentTimestamp = payload["Consent Timestamp"] || new Date().toISOString();
  
  console.log("Marketing consent for:", learnerEmail, "Status:", consentStatus);

  // Update or insert learner with consent info
  const { error: upsertError } = await supabase
    .from("graphy_learners")
    .upsert({
      email: learnerEmail.toLowerCase(),
      marketing_consent: consentStatus,
      consent_timestamp: consentTimestamp,
      profile_data: {
        consent_type: consentType,
        consent_updated_at: consentTimestamp,
      },
      updated_at: new Date().toISOString(),
    }, { onConflict: "email" });

  if (upsertError) {
    console.error("Error updating consent:", upsertError);
    throw new Error("Database update error");
  }

  console.log("Marketing consent updated for:", learnerEmail);
  return { success: true, message: "Consent updated", email: learnerEmail, consent: consentStatus };
}

// Handle course progress (similar to item completion but may have different format)
async function handleCourseProgress(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Course Progress ===");
  
  // This is similar to item completion, delegate to that handler
  return handleItemCompletion(supabase, payload, learnerEmail);
}

// Handle certificate downloaded
async function handleCertificateDownloaded(supabase: any, payload: GraphyWebhookPayload, learnerEmail: string) {
  console.log("=== Processing Certificate Downloaded ===");
  
  const certificateUrl = payload["Certificate URL"];
  const certificateId = payload["Certificate Id"];
  const downloadTimestamp = payload["Download Timestamp"] || new Date().toISOString();
  const courseName = payload["Course Name"] || payload.data?.course?.name;
  
  console.log("Certificate downloaded by:", learnerEmail, "Course:", courseName);

  // Find the enrollment for this learner
  const { data: enrollments, error: fetchError } = await supabase
    .from("course_enrollments")
    .select("id, certificate_download_count, certificate_url")
    .eq("email", learnerEmail.toLowerCase())
    .order("created_at", { ascending: false });

  if (fetchError) {
    console.error("Error fetching enrollments:", fetchError);
  }

  let enrollmentId = null;
  if (enrollments && enrollments.length > 0) {
    enrollmentId = enrollments[0].id;
    const currentCount = enrollments[0].certificate_download_count || 0;

    // Update enrollment with certificate info
    await supabase
      .from("course_enrollments")
      .update({
        certificate_url: certificateUrl || enrollments[0].certificate_url,
        certificate_download_count: currentCount + 1,
        certificate_issued: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", enrollmentId);
  }

  // Log the certificate download
  const { error: insertError } = await supabase
    .from("certificate_downloads")
    .insert({
      enrollment_id: enrollmentId,
      email: learnerEmail.toLowerCase(),
      course_name: courseName,
      certificate_url: certificateUrl,
      downloaded_at: downloadTimestamp,
    });

  if (insertError) {
    console.error("Error logging certificate download:", insertError);
    throw new Error("Database insert error");
  }

  // Record milestone if this is first download
  if (enrollmentId && enrollments && enrollments[0].certificate_download_count === 0) {
    await supabase
      .from("enrollment_milestones")
      .insert({
        enrollment_id: enrollmentId,
        milestone_type: "certificate_download",
        achieved_at: downloadTimestamp,
      });
    console.log("Certificate download milestone recorded");
  }

  console.log("Certificate download logged for:", learnerEmail);
  return { success: true, message: "Certificate download logged", email: learnerEmail };
}

// Handle video upload processed
async function handleVideoProcessed(supabase: any, payload: GraphyWebhookPayload) {
  console.log("=== Processing Video Processed ===");
  
  const videoId = payload["Video Id"];
  const videoTitle = payload["Video Title"];
  const status = payload["Processing Status"] || "processed";
  const courseName = payload["Course Name"] || payload.data?.course?.name;
  
  console.log("Video processed:", videoId, "Status:", status);

  // Log the video processing event
  const { error: insertError } = await supabase
    .from("video_processing_logs")
    .insert({
      video_id: videoId,
      course_name: courseName,
      status: status,
      processed_at: new Date().toISOString(),
      metadata: {
        title: videoTitle,
        ...payload,
      },
    });

  if (insertError) {
    console.error("Error logging video processing:", insertError);
    throw new Error("Database insert error");
  }

  console.log("Video processing logged:", videoId);
  return { success: true, message: "Video processing logged", video_id: videoId };
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
    .select("id, course_id, student_name, status")
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

    // Extract learner email (not required for all event types)
    const learnerEmail = extractEmail(payload);
    
    // Some events don't require email (course_published, video_processed)
    const emailNotRequired = ["course_published", "video_processed"];
    
    if (!learnerEmail && !emailNotRequired.includes(eventType)) {
      console.error("No learner email found in payload");
      return new Response(
        JSON.stringify({ success: false, error: "No learner email in payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing for email:", learnerEmail || "N/A (not required)");

    let result;

    // Route to appropriate handler based on event type
    switch (eventType) {
      // New handlers
      case "new_learner":
      case "new_learner_created":
        result = await handleNewLearner(supabase, payload, learnerEmail!);
        break;
        
      case "profile_updated":
      case "learner_profile_updated":
        result = await handleProfileUpdate(supabase, payload, learnerEmail!);
        break;
        
      case "course_published":
      case "new_course_published":
        result = await handleCoursePublished(supabase, payload);
        break;
        
      case "new_subscriber":
        result = await handleNewSubscriber(supabase, payload);
        break;
        
      case "success_transaction_v2":
        result = await handleSuccessTransactionV2(supabase, payload, learnerEmail!);
        break;
        
      case "marketing_consent":
        result = await handleMarketingConsent(supabase, payload, learnerEmail!);
        break;
        
      case "course_progress":
        result = await handleCourseProgress(supabase, payload, learnerEmail!);
        break;
        
      case "certificate_downloaded":
        result = await handleCertificateDownloaded(supabase, payload, learnerEmail!);
        break;
        
      case "video_processed":
      case "video_upload_processed":
        result = await handleVideoProcessed(supabase, payload);
        break;
      
      // Existing handlers
      case "new_enrollment":
      case "enrollment_created":
        result = await handleEnrollment(supabase, payload, learnerEmail!);
        break;
        
      case "success_transaction":
      case "payment_success":
      case "order_completed":
      case "purchase_completed":
        result = await handleSuccessTransaction(supabase, payload, learnerEmail!);
        break;
        
      case "item_completion":
      case "course_item_completion":
      case "lesson_complete":
        result = await handleItemCompletion(supabase, payload, learnerEmail!);
        break;
        
      case "course_completion":
      case "course_complete":
        result = await handleCourseCompletion(supabase, payload, learnerEmail!);
        break;
        
      case "init_transaction":
      case "transaction_initiated":
        result = await handleInitTransaction(supabase, payload, learnerEmail!);
        break;
        
      default:
        console.log(`Event type '${eventType}' not specifically handled, treating as enrollment`);
        result = await handleEnrollment(supabase, payload, learnerEmail!);
    }

    console.log("=== Webhook Processing Complete ===");
    console.log("Result:", result);

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("=== Webhook Processing Error ===");
    console.error("Error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
