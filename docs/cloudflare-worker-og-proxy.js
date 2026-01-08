/**
 * Cloudflare Worker: Social Media Crawler OG Proxy for Shastrakulam
 * 
 * This worker intercepts requests from social media crawlers (WhatsApp, Facebook, etc.)
 * for blog, course, and bodhika landing page URLs, and serves them pre-rendered HTML 
 * with proper OG tags from the og-share edge function.
 * 
 * DEPLOYMENT STEPS:
 * 1. Go to https://dash.cloudflare.com
 * 2. Select your domain (shastrakulam.com)
 * 3. Go to Workers & Pages → Create Application → Create Worker
 * 4. Name it "og-proxy" and click Deploy
 * 5. Click "Edit code" and paste this entire script
 * 6. Click "Save and Deploy"
 * 7. Go to Workers & Pages → og-proxy → Triggers → Add Route
 * 8. Add these routes:
 *    - shastrakulam.com/blog/*
 *    - shastrakulam.com/courses/*
 *    - shastrakulam.com/bodhika
 *    - www.shastrakulam.com/blog/*
 *    - www.shastrakulam.com/courses/*
 *    - www.shastrakulam.com/bodhika
 * 9. Done! Test by sharing a blog URL on WhatsApp.
 */

// Social media crawler User-Agent patterns
const CRAWLER_PATTERNS = [
  /facebookexternalhit/i,
  /Facebot/i,
  /WhatsApp/i,
  /Twitterbot/i,
  /LinkedInBot/i,
  /Slackbot/i,
  /TelegramBot/i,
  /Pinterest/i,
  /Discordbot/i,
  /Embedly/i,
  /Quora Link Preview/i,
  /Showyoubot/i,
  /outbrain/i,
  /vkShare/i,
  /W3C_Validator/i,
  /redditbot/i,
  /Applebot/i,
  /Baiduspider/i,
  /bingbot/i,
  /Googlebot/i,
];

// Your Supabase edge function URL for OG share
const OG_SHARE_BASE_URL = 'https://qqvirwqrecpzbldjyiua.supabase.co/functions/v1/og-share';

// Your actual website origin (where the SPA is hosted)
const WEBSITE_ORIGIN = 'https://shastrakulam.com';

/**
 * Check if the request is from a social media crawler
 */
function isCrawler(userAgent) {
  if (!userAgent) return false;
  return CRAWLER_PATTERNS.some(pattern => pattern.test(userAgent));
}

/**
 * Extract type and slug from the URL path
 * /blog/my-post-slug → { type: 'blog', slug: 'my-post-slug' }
 * /courses/my-course → { type: 'courses', slug: 'my-course' }
 * /bodhika → { type: 'bodhika', slug: null }
 */
function parseContentPath(pathname) {
  // Check for bodhika landing page first
  if (pathname === '/bodhika' || pathname === '/bodhika/') {
    return { type: 'bodhika', slug: null };
  }
  
  const match = pathname.match(/^\/(blog|courses)\/([^\/\?#]+)/);
  if (match) {
    return { type: match[1], slug: match[2] };
  }
  return null;
}

/**
 * Main worker handler
 */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    
    // Parse the content path
    const content = parseContentPath(url.pathname);
    
    // If this is not a blog/course URL, pass through to origin
    if (!content) {
      return fetch(request);
    }
    
    // Check if this is a crawler request
    if (isCrawler(userAgent)) {
      // Construct the og-share URL
      const ogShareUrl = content.slug 
        ? `${OG_SHARE_BASE_URL}/${content.type}/${content.slug}`
        : `${OG_SHARE_BASE_URL}/${content.type}`;
      
      console.log(`[OG Proxy] Crawler detected: ${userAgent.substring(0, 50)}...`);
      console.log(`[OG Proxy] Proxying to: ${ogShareUrl}`);
      
      try {
        // Fetch from the og-share edge function
        const ogResponse = await fetch(ogShareUrl, {
          method: 'GET',
          headers: {
            'User-Agent': userAgent,
            'Accept': 'text/html',
          },
        });
        
        // If og-share returns an error, fall back to origin
        if (!ogResponse.ok) {
          console.log(`[OG Proxy] og-share returned ${ogResponse.status}, falling back to origin`);
          return fetch(request);
        }
        
        // Return the OG-enriched HTML response
        const html = await ogResponse.text();
        
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=600, s-maxage=3600',
            'Vary': 'User-Agent',
            'X-OG-Proxy': 'true',
          },
        });
      } catch (error) {
        console.error(`[OG Proxy] Error fetching og-share: ${error.message}`);
        // Fall back to origin on error
        return fetch(request);
      }
    }
    
    // For regular users, pass through to the origin website
    console.log(`[OG Proxy] Regular user, passing through to origin`);
    return fetch(request);
  },
};
