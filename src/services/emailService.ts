
import { supabase } from "@/integrations/supabase/client";

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
  emailType?: string;
}

/**
 * Send an email using the Supabase edge function
 */
export const sendEmail = async ({
  to,
  subject,
  html,
  text,
  from,
  emailType = "general"
}: SendEmailProps) => {
  try {
    // Get the current user if available
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: {
        to,
        subject,
        html,
        text,
        from,
        emailType,
        userId: user?.id
      },
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Exception sending email:", error);
    return { data: null, error };
  }
};

/**
 * Send a welcome email to a new user
 */
export const sendWelcomeEmail = async (email: string, name: string) => {
  const subject = "Welcome to ICE Alarm España";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0066cc;">Welcome to ICE Alarm España!</h1>
      <p>Hello ${name || "there"},</p>
      <p>Thank you for joining ICE Alarm España. We're excited to have you on board!</p>
      <p>With our health monitoring services, you'll enjoy:</p>
      <ul>
        <li>24/7 emergency assistance</li>
        <li>AI-powered health monitoring</li>
        <li>Support in multiple languages</li>
      </ul>
      <p>If you have any questions, please don't hesitate to contact our support team.</p>
      <p>Best regards,<br>The ICE Alarm España Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject,
    html,
    emailType: "welcome"
  });
};

/**
 * Send a notification email for important events
 */
export const sendNotificationEmail = async (email: string, title: string, message: string) => {
  const subject = `ICE Alarm Notification: ${title}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #0066cc;">ICE Alarm Notification</h1>
      <h2>${title}</h2>
      <p>${message}</p>
      <p>For more details, please log in to your ICE Alarm dashboard.</p>
      <p>Best regards,<br>The ICE Alarm España Team</p>
    </div>
  `;

  return sendEmail({
    to: email,
    subject,
    html,
    emailType: "notification"
  });
};

/**
 * Retrieve email logs for the current user
 */
export const getUserEmailLogs = async () => {
  try {
    const { data, error } = await supabase
      .from("email_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error retrieving email logs:", error);
    return { data: null, error };
  }
};
