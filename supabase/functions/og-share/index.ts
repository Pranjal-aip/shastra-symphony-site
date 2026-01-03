import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const pathParts = url.pathname.split('/').filter(Boolean)
  
  // Log incoming request for debugging
  const userAgent = req.headers.get('user-agent') || ''
  console.log('OG Share Request:', {
    pathname: url.pathname,
    pathParts,
    userAgent: userAgent.substring(0, 100),
  })
  
  // Use last two segments: /functions/v1/og-share/blog/:slug -> type=blog, slug=:slug
  const type = pathParts.at(-2) // 'blog' or 'courses'
  const slug = pathParts.at(-1)

  console.log('Parsed:', { type, slug })

  // Validate type and slug
  if (!type || !slug || (type !== 'blog' && type !== 'courses')) {
    console.log('Invalid type or slug, returning 404')
    return new Response('Not found', { status: 404 })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const baseUrl = 'https://shastrakulam.com'
  const defaultImage = `${baseUrl}/og-default.jpg`
  
  let title = 'Shastrakulam – Vedic Education'
  let description = 'Authentic Vedic education through Sanskrit courses, gurukul schooling, and immersive camps.'
  let image = defaultImage
  let pageUrl = baseUrl

  try {
    if (type === 'blog') {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('title_en, excerpt_en, thumbnail, slug')
        .eq('slug', slug)
        .single()

      console.log('Blog query result:', { post, error })

      if (post) {
        title = post.title_en || title
        description = post.excerpt_en || description
        image = post.thumbnail && post.thumbnail.startsWith('http') 
          ? post.thumbnail 
          : post.thumbnail 
            ? `${baseUrl}${post.thumbnail.startsWith('/') ? '' : '/'}${post.thumbnail}`
            : defaultImage
        pageUrl = `${baseUrl}/blog/${slug}`
      }
    } else if (type === 'courses') {
      const { data: course, error } = await supabase
        .from('courses')
        .select('title_en, short_description_en, thumbnail, slug')
        .eq('slug', slug)
        .single()

      console.log('Course query result:', { course, error })

      if (course) {
        title = course.title_en || title
        description = course.short_description_en || description
        image = course.thumbnail && course.thumbnail.startsWith('http') 
          ? course.thumbnail 
          : course.thumbnail 
            ? `${baseUrl}${course.thumbnail.startsWith('/') ? '' : '/'}${course.thumbnail}`
            : defaultImage
        pageUrl = `${baseUrl}/courses/${slug}`
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  // Detect if this is a social media crawler
  const isCrawler = /facebookexternalhit|WhatsApp|Twitterbot|LinkedInBot|Slackbot|TelegramBot|Pinterest|Discordbot/i.test(userAgent)

  console.log('Final values:', { title, description, image, pageUrl, isCrawler })

  // For crawlers, return HTML with OG tags
  // For regular users, redirect to the actual page
  if (isCrawler) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Shastrakulam</title>
  <meta name="description" content="${escapeHtml(description)}">
  
  <!-- Open Graph -->
  <meta property="og:type" content="${type === 'blog' ? 'article' : 'website'}">
  <meta property="og:site_name" content="Shastrakulam">
  <meta property="og:title" content="${escapeHtml(title)} | Shastrakulam">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:url" content="${pageUrl}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@shastrakulam">
  <meta name="twitter:title" content="${escapeHtml(title)} | Shastrakulam">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${image}">
  
  <link rel="canonical" href="${pageUrl}">
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(description)}</p>
  <a href="${pageUrl}">View on Shastrakulam</a>
</body>
</html>`

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }

  // For regular users, redirect to the actual page
  return new Response(null, {
    status: 302,
    headers: {
      ...corsHeaders,
      'Location': pageUrl,
    },
  })
})

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
