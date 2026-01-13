import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

type Language = 'en' | 'hi' | 'sa'

const bodhikaOG = {
  en: {
    title: 'Bodhika – One Year Vedic Certificate Course',
    description: 'A transformative one-year certificate course in Vedic education for children and teens. Sanskrit, Bhagavad Gita, Ramayana, Mahabharata, and more.',
  },
  hi: {
    title: 'बोधिका – एक वर्षीय वैदिक प्रमाणपत्र पाठ्यक्रम',
    description: 'बच्चों और किशोरों के लिए वैदिक शिक्षा में एक परिवर्तनकारी एक वर्षीय प्रमाणपत्र पाठ्यक्रम। संस्कृत, भगवद्गीता, रामायण, महाभारत और बहुत कुछ।',
  },
  sa: {
    title: 'बोधिका – एकवर्षीयं वैदिकप्रमाणपत्रपाठ्यक्रमम्',
    description: 'बालकानां किशोराणां च कृते वैदिकशिक्षायां परिवर्तनकारी एकवर्षीयं प्रमाणपत्रपाठ्यक्रमम्। संस्कृतं भगवद्गीता रामायणं महाभारतं च।',
  },
}

const homepageOG = {
  en: {
    title: 'Shastrakulam – Authentic Vedic Education for All Ages',
    description: 'Discover the timeless wisdom of ancient India through Sanskrit courses, Vedic mathematics, Bhagavad Gita classes, and immersive gurukul experiences.',
  },
  hi: {
    title: 'शास्त्रकुलम् – सभी उम्र के लिए प्रामाणिक वैदिक शिक्षा',
    description: 'संस्कृत पाठ्यक्रम, वैदिक गणित, भगवद्गीता कक्षाओं और गुरुकुल अनुभवों के माध्यम से प्राचीन भारत की कालातीत बुद्धि की खोज करें।',
  },
  sa: {
    title: 'शास्त्रकुलम् – सर्वेभ्यः प्रामाणिकी वैदिकी शिक्षा',
    description: 'संस्कृतपाठ्यक्रमाणां वैदिकगणितस्य भगवद्गीताकक्षाणां गुरुकुलानुभवानां च माध्यमेन प्राचीनभारतस्य शाश्वतं ज्ञानम् अन्वेषयतु।',
  },
}

const localeMap: Record<Language, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  sa: 'sa_IN',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const pathParts = url.pathname.split('/').filter(Boolean)
  
  // Parse language from query parameter (default: en)
  const langParam = url.searchParams.get('lang') || 'en'
  const lang: Language = ['en', 'hi', 'sa'].includes(langParam) ? langParam as Language : 'en'
  
  // Log incoming request for debugging
  const userAgent = req.headers.get('user-agent') || ''
  console.log('OG Share Request:', {
    pathname: url.pathname,
    pathParts,
    lang,
    userAgent: userAgent.substring(0, 100),
  })
  
  // Parse the path to extract type and slug
  const ogShareIndex = pathParts.findIndex(p => p === 'og-share')
  const relevantParts = ogShareIndex >= 0 
    ? pathParts.slice(ogShareIndex + 1) 
    : pathParts
  
  console.log('Relevant parts after og-share:', relevantParts)
  
  let type: string | undefined
  let slug: string | undefined | null = null
  
  if (relevantParts.length === 0 || relevantParts[0] === 'homepage') {
    type = 'homepage'
  } else if (relevantParts[0] === 'bodhika') {
    type = 'bodhika'
  } else if (relevantParts[0] === 'blog' && relevantParts[1]) {
    type = 'blog'
    slug = relevantParts[1]
  } else if (relevantParts[0] === 'courses' && relevantParts[1]) {
    type = 'courses'
    slug = relevantParts[1]
  }

  console.log('Parsed:', { type, slug, lang, relevantParts })

  const validTypes = ['blog', 'courses', 'bodhika', 'homepage']
  const needsSlug = type === 'blog' || type === 'courses'
  if (!type || (needsSlug && !slug) || !validTypes.includes(type)) {
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
  const locale = localeMap[lang]

  try {
    if (type === 'homepage') {
      title = homepageOG[lang].title
      description = homepageOG[lang].description
      image = `${baseUrl}/og-default.jpg`
      pageUrl = baseUrl
      console.log('Homepage detected, lang:', lang)
    } else if (type === 'bodhika') {
      title = bodhikaOG[lang].title
      description = bodhikaOG[lang].description
      image = 'https://i.ibb.co/bj9Jhq3k/Gemini-Generated-Image-p3zfonp3zfonp3zf-1.png'
      pageUrl = `${baseUrl}/bodhika`
      console.log('Bodhika landing page detected, lang:', lang)
    } else if (type === 'blog') {
      // Select all language columns
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('title_en, title_hi, title_sa, excerpt_en, excerpt_hi, excerpt_sa, thumbnail, og_image, slug')
        .eq('slug', slug)
        .single()

      console.log('Blog query result:', { post, error })

      if (post) {
        // Get title in requested language, fallback to English
        const titleKey = `title_${lang}` as keyof typeof post
        const excerptKey = `excerpt_${lang}` as keyof typeof post
        
        title = (post[titleKey] as string) || post.title_en || title
        description = (post[excerptKey] as string) || post.excerpt_en || description
        
        const imageSource = post.og_image || post.thumbnail
        image = imageSource && imageSource.startsWith('http') 
          ? imageSource 
          : imageSource 
            ? `${baseUrl}${imageSource.startsWith('/') ? '' : '/'}${imageSource}`
            : defaultImage
        pageUrl = `${baseUrl}/blog/${slug}`
      }
    } else if (type === 'courses') {
      // Select all language columns
      const { data: course, error } = await supabase
        .from('courses')
        .select('title_en, title_hi, title_sa, short_description_en, short_description_hi, short_description_sa, thumbnail, og_image, slug')
        .eq('slug', slug)
        .single()

      console.log('Course query result:', { course, error })

      if (course) {
        const titleKey = `title_${lang}` as keyof typeof course
        const descKey = `short_description_${lang}` as keyof typeof course
        
        title = (course[titleKey] as string) || course.title_en || title
        description = (course[descKey] as string) || course.short_description_en || description
        
        const imageSource = course.og_image || course.thumbnail
        image = imageSource && imageSource.startsWith('http') 
          ? imageSource 
          : imageSource 
            ? `${baseUrl}${imageSource.startsWith('/') ? '' : '/'}${imageSource}`
            : defaultImage
        pageUrl = `${baseUrl}/courses/${slug}`
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }

  const isCrawler = /facebookexternalhit|WhatsApp|Twitterbot|LinkedInBot|Slackbot|TelegramBot|Pinterest|Discordbot/i.test(userAgent)

  console.log('Final values:', { title, description, image, pageUrl, lang, locale, isCrawler })

  if (isCrawler) {
    const html = `<!DOCTYPE html>
<html lang="${lang}">
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
  <meta property="og:locale" content="${locale}">
  
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
        'Cache-Control': 'public, max-age=600, s-maxage=3600',
        'Vary': 'User-Agent',
      },
    })
  }

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
