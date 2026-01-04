import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EnrollmentData {
  id: string;
  student_name: string;
  email: string;
  phone: string | null;
  course_id: string;
}

interface CourseData {
  id: string;
  graphy_product_id: string | null;
  title_en: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const graphyApiKey = Deno.env.get('GRAPHY_API_KEY');
    const graphyMid = Deno.env.get('GRAPHY_MID');

    if (!graphyApiKey || !graphyMid) {
      console.error('Missing Graphy credentials');
      return new Response(
        JSON.stringify({ error: 'Graphy API not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    if (!action) {
      return new Response(
        JSON.stringify({ error: 'Action parameter required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json().catch(() => ({}));

    switch (action) {
      case 'enroll': {
        const { enrollment_id } = body;
        
        if (!enrollment_id) {
          return new Response(
            JSON.stringify({ error: 'enrollment_id required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log(`Processing enrollment: ${enrollment_id}`);

        // Fetch enrollment details
        const { data: enrollment, error: enrollmentError } = await supabase
          .from('course_enrollments')
          .select('*')
          .eq('id', enrollment_id)
          .single();

        if (enrollmentError || !enrollment) {
          console.error('Enrollment not found:', enrollmentError);
          return new Response(
            JSON.stringify({ error: 'Enrollment not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Fetch course with graphy_product_id
        const { data: course, error: courseError } = await supabase
          .from('courses')
          .select('id, graphy_product_id, title_en')
          .eq('id', enrollment.course_id)
          .single();

        if (courseError || !course) {
          console.error('Course not found:', courseError);
          return new Response(
            JSON.stringify({ error: 'Course not found' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        if (!course.graphy_product_id) {
          console.error('Course does not have a Graphy Product ID');
          await supabase
            .from('course_enrollments')
            .update({ 
              graphy_sync_status: 'failed',
            })
            .eq('id', enrollment_id);
          
          return new Response(
            JSON.stringify({ error: 'Course not linked to Graphy product' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Step 1: Create learner in Graphy
        console.log('Creating learner in Graphy...');
        const createLearnerResponse = await fetch(`https://api.graphy.com/public/v1/learners`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${graphyApiKey}`,
            'X-Graphy-MID': graphyMid,
          },
          body: JSON.stringify({
            name: enrollment.student_name,
            email: enrollment.email,
            phone: enrollment.phone || undefined,
          }),
        });

        const learnerData = await createLearnerResponse.json();
        console.log('Learner API response:', learnerData);

        if (!createLearnerResponse.ok && createLearnerResponse.status !== 409) {
          // 409 means learner already exists, which is fine
          console.error('Failed to create learner:', learnerData);
          await supabase
            .from('course_enrollments')
            .update({ graphy_sync_status: 'failed' })
            .eq('id', enrollment_id);
          
          return new Response(
            JSON.stringify({ error: 'Failed to create learner in Graphy', details: learnerData }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Get learner ID (from creation or from existing)
        const learnerId = learnerData.id || learnerData.learner?.id;
        
        // If learner already existed (409), we need to fetch their ID by email
        let finalLearnerId = learnerId;
        if (!finalLearnerId && createLearnerResponse.status === 409) {
          console.log('Learner exists, fetching by email...');
          const fetchLearnerResponse = await fetch(
            `https://api.graphy.com/public/v1/learners?email=${encodeURIComponent(enrollment.email)}`,
            {
              headers: {
                'Authorization': `Bearer ${graphyApiKey}`,
                'X-Graphy-MID': graphyMid,
              },
            }
          );
          const existingLearner = await fetchLearnerResponse.json();
          console.log('Existing learner data:', existingLearner);
          finalLearnerId = existingLearner.data?.[0]?.id || existingLearner.id;
        }

        if (!finalLearnerId) {
          console.error('Could not get learner ID');
          await supabase
            .from('course_enrollments')
            .update({ graphy_sync_status: 'failed' })
            .eq('id', enrollment_id);
          
          return new Response(
            JSON.stringify({ error: 'Could not get learner ID from Graphy' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log(`Got learner ID: ${finalLearnerId}`);

        // Step 2: Assign course to learner
        console.log('Assigning course to learner...');
        const assignResponse = await fetch(`https://api.graphy.com/public/v1/assign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${graphyApiKey}`,
            'X-Graphy-MID': graphyMid,
          },
          body: JSON.stringify({
            learner_id: finalLearnerId,
            product_id: course.graphy_product_id,
          }),
        });

        const assignData = await assignResponse.json();
        console.log('Assign API response:', assignData);

        if (!assignResponse.ok && assignResponse.status !== 409) {
          console.error('Failed to assign course:', assignData);
          await supabase
            .from('course_enrollments')
            .update({ 
              graphy_learner_id: finalLearnerId,
              graphy_sync_status: 'failed',
            })
            .eq('id', enrollment_id);
          
          return new Response(
            JSON.stringify({ error: 'Failed to assign course in Graphy', details: assignData }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Step 3: Update enrollment in database
        console.log('Updating enrollment in database...');
        const { error: updateError } = await supabase
          .from('course_enrollments')
          .update({
            graphy_learner_id: finalLearnerId,
            graphy_enrolled_at: new Date().toISOString(),
            graphy_sync_status: 'synced',
          })
          .eq('id', enrollment_id);

        if (updateError) {
          console.error('Failed to update enrollment:', updateError);
          return new Response(
            JSON.stringify({ error: 'Failed to update enrollment record', details: updateError }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log('Enrollment sync completed successfully');
        return new Response(
          JSON.stringify({ 
            success: true, 
            learner_id: finalLearnerId,
            message: 'Student enrolled in Graphy successfully'
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'get-progress': {
        const { learner_id, enrollment_id } = body;
        
        if (!learner_id) {
          return new Response(
            JSON.stringify({ error: 'learner_id required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        console.log(`Fetching progress for learner: ${learner_id}`);

        const progressResponse = await fetch(
          `https://api.graphy.com/public/v1/learners/${learner_id}/progress`,
          {
            headers: {
              'Authorization': `Bearer ${graphyApiKey}`,
              'X-Graphy-MID': graphyMid,
            },
          }
        );

        const progressData = await progressResponse.json();
        console.log('Progress API response:', progressData);

        if (!progressResponse.ok) {
          return new Response(
            JSON.stringify({ error: 'Failed to fetch progress', details: progressData }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Optionally update graphy_progress table if enrollment_id provided
        if (enrollment_id) {
          const { error: upsertError } = await supabase
            .from('graphy_progress')
            .upsert({
              enrollment_id,
              progress_percent: progressData.progress_percent || 0,
              time_spent_secs: progressData.time_spent_secs || 0,
              quiz_scores: progressData.quiz_scores || [],
              last_synced_at: new Date().toISOString(),
            }, { onConflict: 'enrollment_id' });

          if (upsertError) {
            console.warn('Failed to update progress record:', upsertError);
          }
        }

        return new Response(
          JSON.stringify({ success: true, progress: progressData }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: `Unknown action: ${action}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
