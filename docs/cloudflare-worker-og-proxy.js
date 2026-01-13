/**
 * Cloudflare Worker for share.shastrakulam.com
 * Handles OG tags for social media sharing
 * 
 * DEPLOYMENT STEPS:
 * 1. Go to https://dash.cloudflare.com
 * 2. Select your domain (shastrakulam.com)
 * 3. Go to Workers & Pages → og-proxy (or create new)
 * 4. Click "Quick Edit" or "Edit code"
 * 5. Replace ALL code with this script
 * 6. Click "Save and Deploy"
 * 7. Go to Triggers → Routes
 * 8. Add route: share.shastrakulam.com/*
 * 9. Done! Test by sharing share.shastrakulam.com/bodhika on WhatsApp
 */

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
  /redditbot/i,
  /Applebot/i,
];

const OG_SHARE_URL = 'https://qqvirwqrecpzbldjyiua.supabase.co/functions/v1/og-share';
const MAIN_SITE = 'https://shastrakulam.com';

function isCrawler(ua) {
  if (!ua) return false;
  return CRAWLER_PATTERNS.some(p => p.test(ua));
}

function parseContent(path) {
  // Remove leading/trailing slashes and normalize
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  
  // Homepage
  if (cleanPath === '' || cleanPath === '/') {
    return { type: 'homepage', slug: null };
  }
  
  // Bodhika landing page
  if (cleanPath === 'bodhika') {
    return { type: 'bodhika', slug: null };
  }
  
  // Blog or courses
  const match = cleanPath.match(/^(blog|courses)\/(.+)$/);
  if (match) {
    return { type: match[1], slug: match[2] };
  }
  
  // Default to homepage for unknown paths
  return { type: 'homepage', slug: null };
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const ua = request.headers.get('User-Agent') || '';
    const content = parseContent(url.pathname);
    
    // Extract language parameter (default: en)
    const lang = url.searchParams.get('lang') || 'en';
    
    console.log('[OG Worker] Request:', {
      host: url.hostname,
      path: url.pathname,
      type: content.type,
      slug: content.slug,
      lang: lang,
      userAgent: ua.substring(0, 60),
      isCrawler: isCrawler(ua)
    });
    
    // ALWAYS redirect regular users to main site (preserve language in URL if needed)
    if (!isCrawler(ua)) {
      const redirectUrl = `${MAIN_SITE}${url.pathname}`;
      console.log('[OG Worker] Regular user, redirecting to:', redirectUrl);
      return Response.redirect(redirectUrl, 301);
    }
    
    // Build og-share URL with language parameter
    let ogUrl = content.slug 
      ? `${OG_SHARE_URL}/${content.type}/${content.slug}`
      : `${OG_SHARE_URL}/${content.type}`;
    
    // Append language parameter
    ogUrl += `?lang=${lang}`;
    
    console.log('[OG Worker] Crawler detected, fetching:', ogUrl);
    
    try {
      const res = await fetch(ogUrl, {
        headers: { 
          'User-Agent': ua,
          'Accept': 'text/html'
        }
      });
      
      if (!res.ok) {
        console.log('[OG Worker] Edge function returned', res.status);
        return Response.redirect(`${MAIN_SITE}${url.pathname}`, 301);
      }
      
      const html = await res.text();
      console.log('[OG Worker] Success, returning OG HTML');
      
      return new Response(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'X-OG-Proxy': 'true',
          'X-Robots-Tag': 'noindex',
        }
      });
    } catch (err) {
      console.log('[OG Worker] Error:', err.message);
      return Response.redirect(`${MAIN_SITE}${url.pathname}`, 301);
    }
  }
};
