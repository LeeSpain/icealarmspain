
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  emailType?: string;
  userId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, text, from, emailType, userId }: EmailRequest = await req.json();

    if (!to || !subject || !html) {
      throw new Error("Missing required fields: to, subject, and html are required");
    }

    console.log(`Sending email to ${to} with subject: ${subject}`);

    const emailResponse = await resend.emails.send({
      from: from || "ICE Alarm <noreply@icealarm.es>",
      to: [to],
      subject: subject,
      html: html,
      text: text,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log the email to our database if userId is provided
    if (userId) {
      const { supabaseClient } = await import("../shared/supabase-client.ts");
      
      await supabaseClient.from("email_logs").insert({
        user_id: userId,
        recipient: to,
        subject: subject,
        email_type: emailType || "general",
        status: "sent"
      });
    }

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.details || null 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
