import nodemailer from 'nodemailer';

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
}

function getEmailConfig(): EmailConfig {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM;

  if (!host || !port || !user || !password || !from) {
    throw new Error('Missing required SMTP environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM');
  }

  return {
    host,
    port: parseInt(port, 10),
    user,
    password,
    from,
  };
}

function createTransporter() {
  const config = getEmailConfig();
  
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465, // true for 465, false for other ports
    auth: {
      user: config.user,
      pass: config.password,
    },
  });
}

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const config = getEmailConfig();
  const transporter = createTransporter();

  await transporter.sendMail({
    from: config.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
}

export async function sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
  const baseUrl = process.env.PASSWORD_RESET_BASE_URL;
  
  if (!baseUrl) {
    throw new Error('Missing required environment variable: PASSWORD_RESET_BASE_URL');
  }

  const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(resetToken)}`;

  const subject = 'Password Reset Request';
  
  const text = `You have requested to reset your password.

Click the following link to reset your password:
${resetUrl}

This link will expire in 1 hour.

If you did not request a password reset, please ignore this email. Your password will remain unchanged.

Do not share this link with anyone.`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #2563eb;">Password Reset Request</h2>
  
  <p>You have requested to reset your password.</p>
  
  <p>Click the button below to reset your password:</p>
  
  <p style="text-align: center; margin: 30px 0;">
    <a href="${resetUrl}" 
       style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
      Reset Password
    </a>
  </p>
  
  <p style="color: #666; font-size: 14px;">
    Or copy and paste this link into your browser:<br>
    <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
  </p>
  
  <p style="color: #666; font-size: 14px;">
    This link will expire in <strong>1 hour</strong>.
  </p>
  
  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  
  <p style="color: #999; font-size: 12px;">
    If you did not request a password reset, please ignore this email. Your password will remain unchanged.
  </p>
  
  <p style="color: #999; font-size: 12px;">
    <strong>Do not share this link with anyone.</strong>
  </p>
</body>
</html>`;

  await sendEmail({
    to: email,
    subject,
    text,
    html,
  });
}
