import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GraphyResponse {
  success: boolean;
  data?: any;
  error?: string;
}

async function graphyRequest(
  endpoint: string,
  method: string = "POST",
  body?: Record<string, any>
): Promise<GraphyResponse> {
  const GRAPHY_MID = Deno.env.get("GRAPHY_MID");
  const GRAPHY_API_KEY = Deno.env.get("GRAPHY_API_KEY");

  if (!GRAPHY_MID || !GRAPHY_API_KEY) {
    return { success: false, error: "Graphy credentials not configured" };
  }

  const baseUrl = "https://api.ongraphy.com/public/v1";
  
  try {
    const requestBody = {
      mid: GRAPHY_MID,
      key: GRAPHY_API_KEY,
      ...body,
    };

    console.log(`Graphy API request: ${method} ${endpoint}`, JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log(`Graphy API response:`, JSON.stringify(data, null, 2));

    if (!response.ok) {
      return { success: false, error: data.message || data.error || "Graphy API error" };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("Graphy API error:", error);
    const errMsg = error instanceof Error ? error.message : "Network error";
    return { success: false, error: errMsg };
  }
}

// Create a learner in Graphy
async function createLearner(email: string, name: string, mobile?: string): Promise<GraphyResponse> {
  return graphyRequest("/learners", "POST", {
    email,
    name,
    mobile: mobile || "",
    sendEmail: false, // Don't send welcome email from Graphy
  });
}

// Assign a course to a learner
async function assignCourse(email: string, productId: string): Promise<GraphyResponse> {
  return graphyRequest("/assign", "POST", {
    email,
    productId,
  });
}

// Get learner info including course progress
async function getLearnerInfo(email: string): Promise<GraphyResponse> {
  const GRAPHY_MID = Deno.env.get("GRAPHY_MID");
  const GRAPHY_API_KEY = Deno.env.get("GRAPHY_API_KEY");

  if (!GRAPHY_MID || !GRAPHY_API_KEY) {
    return { success: false, error: "Graphy credentials not configured" };
  }

  const baseUrl = "https://api.ongraphy.com/public/v1";
  const queryStr = JSON.stringify({ email });
  const url = `${baseUrl}/learners?mid=${GRAPHY_MID}&key=${GRAPHY_API_KEY}&courseInfo=true&query=${encodeURIComponent(queryStr)}`;

  try {
    console.log(`Graphy API GET request: ${url}`);
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    console.log(`Graphy API response:`, JSON.stringify(data, null, 2));

    if (!response.ok) {
      return { success: false, error: data.message || "Graphy API error" };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("Graphy API error:", error);
    const errMsg = error instanceof Error ? error.message : "Network error";
    return { success: false, error: errMsg };
  }
}

// Get all Graphy products (courses)
async function getProducts(): Promise<GraphyResponse> {
  const GRAPHY_MID = Deno.env.get("GRAPHY_MID");
  const GRAPHY_API_KEY = Deno.env.get("GRAPHY_API_KEY");

  if (!GRAPHY_MID || !GRAPHY_API_KEY) {
    return { success: false, error: "Graphy credentials not configured" };
  }

  const baseUrl = "https://api.ongraphy.com/public/v1";
  const url = `${baseUrl}/products?mid=${GRAPHY_MID}&key=${GRAPHY_API_KEY}`;

  try {
    console.log(`Graphy API GET request: ${url}`);
    const response = await fetch(url, { method: "GET" });
    const data = await response.json();
    console.log(`Graphy API response:`, JSON.stringify(data, null, 2));

    if (!response.ok) {
      return { success: false, error: data.message || "Graphy API error" };
    }

    return { success: true, data };
  } catch (error: unknown) {
    console.error("Graphy API error:", error);
    const errMsg = error instanceof Error ? error.message : "Network error";
    return { success: false, error: errMsg };
  }
}

// Generate Graphy checkout URL
function getCheckoutUrl(productId: string, email: string): string {
  const GRAPHY_MID = Deno.env.get("GRAPHY_MID");
  // Format: https://{school-domain}.graphy.com/checkout/{productId}?email={email}
  // Note: The actual domain needs to be configured based on user's Graphy school
  return `https://school.graphy.com/checkout/${productId}?email=${encodeURIComponent(email)}`;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();
    console.log(`Graphy sync action: ${action}`, params);

    let result: GraphyResponse;

    switch (action) {
      case "create_learner":
        result = await createLearner(params.email, params.name, params.mobile);
        break;

      case "assign_course":
        result = await assignCourse(params.email, params.productId);
        break;

      case "get_learner":
        result = await getLearnerInfo(params.email);
        break;

      case "get_products":
        result = await getProducts();
        break;

      case "sync_enrollment": {
        // Full sync flow: create learner + assign course
        const { email, name, mobile, productId, enrollmentId } = params;

        // Step 1: Create learner (will return existing if already exists)
        const learnerResult = await createLearner(email, name, mobile);
        if (!learnerResult.success) {
          // Check if learner already exists (common case)
          if (learnerResult.error?.includes("already exists") || learnerResult.error?.includes("duplicate")) {
            console.log("Learner already exists, proceeding to assign course");
          } else {
            result = learnerResult;
            break;
          }
        }

        const learnerId = learnerResult.data?.id || learnerResult.data?.learnerId;

        // Step 2: Assign course if productId provided
        if (productId) {
          const assignResult = await assignCourse(email, productId);
          if (!assignResult.success) {
            result = { 
              success: false, 
              error: `Learner created but course assignment failed: ${assignResult.error}`,
              data: { learnerId }
            };
            break;
          }
        }

        // Step 3: Update enrollment record in database if enrollmentId provided
        if (enrollmentId) {
          const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
          const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
          const supabase = createClient(supabaseUrl, supabaseKey);

          await supabase
            .from("course_enrollments")
            .update({
              graphy_learner_id: learnerId,
              graphy_sync_status: productId ? "synced" : "learner_created",
              graphy_enrolled_at: productId ? new Date().toISOString() : null,
            })
            .eq("id", enrollmentId);
        }

        result = { 
          success: true, 
          data: { 
            learnerId,
            message: productId 
              ? "Learner created and course assigned successfully" 
              : "Learner created successfully"
          }
        };
        break;
      }

      case "get_checkout_url": {
        const checkoutUrl = getCheckoutUrl(params.productId, params.email);
        result = { success: true, data: { checkoutUrl } };
        break;
      }

      default:
        result = { success: false, error: `Unknown action: ${action}` };
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: result.success ? 200 : 400,
    });
  } catch (error: unknown) {
    console.error("Graphy sync error:", error);
    const errMsg = error instanceof Error ? error.message : "Internal server error";
    return new Response(
      JSON.stringify({ success: false, error: errMsg }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
