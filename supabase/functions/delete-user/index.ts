
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()
    if (!userId) {
      throw new Error('User ID is required.')
    }

    // Create a Supabase client with the user's auth token to verify admin role
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'You are not authenticated.' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401,
      });
    }

    const { data: isAdminData, error: isAdminError } = await supabaseClient.rpc('is_admin')
    if (isAdminError || !isAdminData) {
      console.error('is_admin check error:', isAdminError)
      return new Response(JSON.stringify({ error: 'You are not authorized to perform this action.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      })
    }

    // Create a Supabase admin client to perform the deletion and audit logging
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (deleteError) {
      throw deleteError
    }
    
    // Add to audit log
    const { error: auditError } = await supabaseAdmin.from('audit_log').insert({
        actor_id: user.id,
        action: 'user_deleted',
        target_id: userId,
        target_type: 'user',
        details: { deleted_by: user.email }
    });

    if (auditError) {
        // Log the error but don't fail the request, user deletion was successful
        console.error('Failed to write to audit log:', auditError.message);
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully.' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
