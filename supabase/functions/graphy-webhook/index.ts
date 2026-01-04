import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GraphyWebhookPayload {
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
  };
  learner_email?: string;
  user_email?: string;
  email?: string;
  learner_id?: string;
  product_id?: string;
  course_id?: string;
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

    // Extract event type (Graphy may use different field names)
    const eventType = payload.event || payload.type || "unknown";
    console.log("Event type:", eventType);

    // Handle enrollment/payment events
    const enrollmentEvents = [
      "new_enrollment",
      "enrollment_created",
      "success_transaction",
      "payment_success",
      "order_completed",
      "purchase_completed"
    ];

    if (!enrollmentEvents.includes(eventType.toLowerCase())) {
      console.log(`Event type '${eventType}' not handled, acknowledging receipt`);
      return new Response(
        JSON.stringify({ success: true, message: `Event '${eventType}' acknowledged` }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract email from various possible locations in payload
    const learnerEmail = 
      payload.data?.learner?.email ||
      payload.data?.user?.email ||
      payload.learner_email ||
      payload.user_email ||
      payload.email;

    if (!learnerEmail) {
      console.error("No learner email found in payload");
      return new Response(
        JSON.stringify({ success: false, error: "No learner email in payload" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing enrollment for email:", learnerEmail);

    // Extract learner ID if available
    const graphyLearnerId = 
      payload.data?.learner?.id ||
      payload.data?.user?.id ||
      payload.learner_id;

    // Extract product/course ID if available
    const graphyProductId = 
      payload.data?.product?.id ||
      payload.data?.course?.id ||
      payload.product_id ||
      payload.course_id;

    console.log("Graphy learner ID:", graphyLearnerId);
    console.log("Graphy product ID:", graphyProductId);

    // Find pending enrollment by email (most recent first)
    const { data: pendingEnrollments, error: fetchError } = await supabase
      .from("course_enrollments")
      .select("id, email, status, course_id")
      .eq("email", learnerEmail.toLowerCase())
      .eq("status", "pending")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching enrollments:", fetchError);
      return new Response(
        JSON.stringify({ success: false, error: "Database fetch error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!pendingEnrollments || pendingEnrollments.length === 0) {
      console.log("No pending enrollment found for email:", learnerEmail);
      // Still return 200 to acknowledge - might be a duplicate or already processed
      return new Response(
        JSON.stringify({ success: true, message: "No pending enrollment found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${pendingEnrollments.length} pending enrollment(s)`);

    // Update the most recent pending enrollment
    const enrollmentToUpdate = pendingEnrollments[0];
    
    const { data: updatedEnrollment, error: updateError } = await supabase
      .from("course_enrollments")
      .update({
        status: "enrolled",
        graphy_sync_status: "synced",
        graphy_learner_id: graphyLearnerId || null,
        graphy_enrolled_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", enrollmentToUpdate.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating enrollment:", updateError);
      return new Response(
        JSON.stringify({ success: false, error: "Database update error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("=== Enrollment Updated Successfully ===");
    console.log("Enrollment ID:", enrollmentToUpdate.id);
    console.log("New status: enrolled");
    console.log("Graphy sync status: synced");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Enrollment updated successfully",
        enrollment_id: enrollmentToUpdate.id,
      }),
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
