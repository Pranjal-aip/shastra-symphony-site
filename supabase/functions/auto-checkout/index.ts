import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Course configuration for Bodhika batches
const COURSES = {
  group: {
    courseId: '695393a483bcbf4ec9283f27',
    slug: 'Bodhika--Awakening-Young-Minds-695393a483bcbf4ec9283f27',
    amount: 6000
  },
  focused: {
    courseId: '6953f67fba62d03beeceac42',
    slug: 'Bodhika--Awakening-Young-Minds-10-students-batch-6953f67fba62d03beeceac42',
    amount: 13000
  }
} as const;

const GRAPHY_DOMAIN = 'learn.shastrakulam.com';

// Generate unique ID with prefix, timestamp, and random string
function generateUniqueId(prefix: string): string {
  const timestamp = Date.now();
  const randomPart = crypto.randomUUID().replace(/-/g, '').substring(0, 12);
  return `${prefix}_${timestamp}_${randomPart}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { courseType } = await req.json();

    // Validate course type
    if (!courseType || !['group', 'focused'].includes(courseType)) {
      console.error('Invalid courseType:', courseType);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid course type. Must be "group" or "focused".',
          fallbackUrl: `https://${GRAPHY_DOMAIN}/single-checkout/${COURSES.group.courseId}`
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const course = COURSES[courseType as keyof typeof COURSES];
    console.log('Processing checkout for course:', courseType, course);

    // Generate unique order and transaction IDs
    const orderId = generateUniqueId('ORD');
    const transactionId = generateUniqueId('TXN');
    
    console.log('Generated IDs:', { orderId, transactionId });

    // Build the pre-checkout path
    const preCheckoutPath = `/t/public/pre-checkout/single-checkout?` +
      `courseId=${course.courseId}` +
      `&pid=null` +
      `&orderId=${orderId}` +
      `&courseAmount=${course.amount}` +
      `&pg=cashfree` +
      `&currencyCode=INR` +
      `&transactionId=${transactionId}`;

    // URL-encode the pre-checkout path
    const encodedPath = encodeURIComponent(preCheckoutPath);

    // Build the final redirect URL
    const redirectUrl = `https://${GRAPHY_DOMAIN}/courses/${course.slug}` +
      `?page=checkout` +
      `&rzpCashfreeRedirectToPreCheckoutFlow=true` +
      `&newCheckoutFlowRedirectIssue=true` +
      `&newCheckoutFlowParams=${encodedPath}`;

    console.log('Generated redirect URL:', redirectUrl);

    // Return the redirect URL
    return new Response(
      JSON.stringify({ 
        redirectUrl,
        orderId,
        transactionId,
        courseId: course.courseId,
        amount: course.amount
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Auto-checkout error:', error);
    
    // Return fallback URL on error
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate checkout URL',
        fallbackUrl: `https://${GRAPHY_DOMAIN}/single-checkout/${COURSES.group.courseId}`
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
