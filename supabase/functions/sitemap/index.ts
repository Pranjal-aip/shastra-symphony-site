import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const baseUrl = 'https://shastrakulam.com'
  const now = new Date().toISOString().split('T')[0]

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/courses', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/camps', priority: '0.8', changefreq: 'weekly' },
    { url: '/programs', priority: '0.8', changefreq: 'monthly' },
    { url: '/donate', priority: '0.6', changefreq: 'monthly' },
    { url: '/bodhika', priority: '0.9', changefreq: 'weekly' },
  ]

  // Fetch all courses
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false })

  if (coursesError) {
    console.error('Error fetching courses:', coursesError)
  }

  // Fetch all blog posts
  const { data: blogPosts, error: blogError } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .order('updated_at', { ascending: false })

  if (blogError) {
    console.error('Error fetching blog posts:', blogError)
  }

  // Build sitemap XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  // Add static pages
  for (const page of staticPages) {
    sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`
  }

  // Add courses
  if (courses && courses.length > 0) {
    for (const course of courses) {
      const lastmod = course.updated_at 
        ? new Date(course.updated_at).toISOString().split('T')[0] 
        : now
      sitemap += `  <url>
    <loc>${baseUrl}/courses/${course.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`
    }
  }

  // Add blog posts
  if (blogPosts && blogPosts.length > 0) {
    for (const post of blogPosts) {
      const lastmod = post.updated_at 
        ? new Date(post.updated_at).toISOString().split('T')[0] 
        : now
      sitemap += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
    }
  }

  sitemap += `</urlset>`

  console.log(`Sitemap generated: ${staticPages.length} static pages, ${courses?.length || 0} courses, ${blogPosts?.length || 0} blog posts`)

  return new Response(sitemap, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
})
