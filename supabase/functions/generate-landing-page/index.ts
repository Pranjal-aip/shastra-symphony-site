import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CourseInput {
  // Step 1: Course Basics
  courseName: string;
  transformationGoal: string;
  courseCategory: string;
  courseDuration: string;
  courseMode: string;
  languages: string[];
  
  // Step 2: Target Audience
  targetAudience: string[];
  courseNature: string;
  difficultyLevel: string;
  
  // Step 3: Course Structure
  numberOfModules: number;
  weeklyHours: number;
  teachingStyle: string[];
  certificateProvided: boolean;
  
  // Step 4: Batch & Pricing
  batches: Array<{
    name: string;
    size: number;
    price: number;
    isHighlighted: boolean;
  }>;
  scholarshipAvailable: boolean;
  limitedSeatsBadge: boolean;
  
  // Step 5: Trust & Authority
  institutionName: string;
  instructorName?: string;
  yearsOfExperience?: number;
  totalStudentsTaught?: number;
  recognitions?: string;
  
  // Step 6: Tone & Style
  toneStyle: string;
  
  // Optional: regenerate specific section
  regenerateSection?: string;
  existingContent?: Record<string, unknown>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const input: CourseInput = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating landing page for:", input.courseName);

    const systemPrompt = `You are an expert copywriter specializing in high-conversion educational landing pages for Indian audiences. You understand Indian cultural values, family-oriented messaging, and spiritual/traditional education contexts.

Your writing style adapts based on the tone requested:
- "Calm & Spiritual": Use peaceful, meditative language with Sanskrit influences
- "Powerful & Transformational": Use bold, inspiring language about life change
- "Modern & Youthful": Use energetic, relatable language for younger audiences
- "Traditional & Authentic": Use respectful, heritage-focused language
- "Parent-Friendly & Trust-Based": Use reassuring, safety-focused language for parents

Always:
- Write in a way that resonates with Indian families
- Include emotional triggers and conversion elements
- Focus on transformation and benefits over features
- Create urgency without being pushy
- Use clear, simple language avoiding jargon`;

    const generatePrompt = (section: string | null) => {
      const baseContext = `
Course Details:
- Name: ${input.courseName}
- Transformation Goal: ${input.transformationGoal}
- Category: ${input.courseCategory}
- Duration: ${input.courseDuration}
- Mode: ${input.courseMode}
- Languages: ${input.languages.join(', ')}
- Target Audience: ${input.targetAudience.join(', ')}
- Course Nature: ${input.courseNature}
- Difficulty: ${input.difficultyLevel}
- Modules: ${input.numberOfModules}
- Weekly Hours: ${input.weeklyHours}
- Teaching Style: ${input.teachingStyle.join(', ')}
- Certificate: ${input.certificateProvided ? 'Yes' : 'No'}
- Institution: ${input.institutionName}
${input.instructorName ? `- Instructor: ${input.instructorName}` : ''}
${input.yearsOfExperience ? `- Experience: ${input.yearsOfExperience} years` : ''}
${input.totalStudentsTaught ? `- Students Taught: ${input.totalStudentsTaught}+` : ''}
${input.recognitions ? `- Recognitions: ${input.recognitions}` : ''}
- Tone: ${input.toneStyle}
- Scholarship Available: ${input.scholarshipAvailable ? 'Yes' : 'No'}
- Limited Seats Badge: ${input.limitedSeatsBadge ? 'Yes' : 'No'}

Batches:
${input.batches.map(b => `- ${b.name}: ₹${b.price} (${b.size} seats)${b.isHighlighted ? ' [RECOMMENDED]' : ''}`).join('\n')}
`;

      if (section) {
        return `${baseContext}

Generate ONLY the "${section}" section content in JSON format. The content should be in three languages: English (en), Hindi (hi), and Sanskrit (sa).`;
      }

      return `${baseContext}

Generate a complete high-conversion landing page with all sections. Return a JSON object with the following structure:

{
  "hero": {
    "headline": { "en": "...", "hi": "...", "sa": "..." },
    "subheadline": { "en": "...", "hi": "...", "sa": "..." },
    "primaryCta": { "en": "...", "hi": "...", "sa": "..." },
    "secondaryCta": { "en": "...", "hi": "...", "sa": "..." },
    "urgencyBadge": { "en": "...", "hi": "...", "sa": "..." }
  },
  "coursePurpose": {
    "title": { "en": "...", "hi": "...", "sa": "..." },
    "problem": { "en": "...", "hi": "...", "sa": "..." },
    "gap": { "en": "...", "hi": "...", "sa": "..." },
    "solution": { "en": "...", "hi": "...", "sa": "..." }
  },
  "whoShouldJoin": {
    "title": { "en": "...", "hi": "...", "sa": "..." },
    "cards": [
      {
        "audience": { "en": "...", "hi": "...", "sa": "..." },
        "description": { "en": "...", "hi": "...", "sa": "..." }
      }
    ]
  },
  "whatYouWillLearn": {
    "title": { "en": "...", "hi": "...", "sa": "..." },
    "modules": [
      {
        "title": { "en": "...", "hi": "...", "sa": "..." },
        "benefits": [
          { "en": "...", "hi": "...", "sa": "..." }
        ]
      }
    ]
  },
  "courseStructure": {
    "title": { "en": "...", "hi": "...", "sa": "..." },
    "duration": { "en": "...", "hi": "...", "sa": "..." },
    "weeklyFormat": { "en": "...", "hi": "...", "sa": "..." },
    "mode": { "en": "...", "hi": "...", "sa": "..." },
    "language": { "en": "...", "hi": "...", "sa": "..." },
    "certificate": { "en": "...", "hi": "...", "sa": "..." }
  },
  "pricing": {
    "title": { "en": "...", "hi": "...", "sa": "..." },
    "scholarshipNote": { "en": "...", "hi": "...", "sa": "..." }
  },
  "whyChooseUs": {
    "title": { "en": "...", "hi": "...", "sa": "..." },
    "points": [
      {
        "title": { "en": "...", "hi": "...", "sa": "..." },
        "description": { "en": "...", "hi": "...", "sa": "..." }
      }
    ]
  },
  "faqs": {
    "title": { "en": "...", "hi": "...", "sa": "..." },
    "questions": [
      {
        "question": { "en": "...", "hi": "...", "sa": "..." },
        "answer": { "en": "...", "hi": "...", "sa": "..." }
      }
    ]
  },
  "finalCta": {
    "headline": { "en": "...", "hi": "...", "sa": "..." },
    "paragraph": { "en": "...", "hi": "...", "sa": "..." },
    "buttonText": { "en": "...", "hi": "...", "sa": "..." }
  }
}

Generate 6-8 FAQs based on common questions for this type of course.
Create ${input.numberOfModules} module descriptions.
Create audience cards for: ${input.targetAudience.join(', ')}.
Make the content emotionally compelling and conversion-focused.
IMPORTANT: Return ONLY valid JSON, no additional text.`;
    };

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: generatePrompt(input.regenerateSection || null) }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content received from AI");
    }

    console.log("Raw AI response:", content.substring(0, 500));

    // Extract JSON from response (handle markdown code blocks)
    let jsonContent = content;
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1].trim();
    }

    let generatedContent;
    try {
      generatedContent = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Content was:", jsonContent);
      throw new Error("Failed to parse AI-generated content");
    }

    console.log("Successfully generated landing page content");

    return new Response(JSON.stringify({ 
      success: true, 
      content: generatedContent,
      section: input.regenerateSection || 'all'
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error in generate-landing-page:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error occurred" 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
