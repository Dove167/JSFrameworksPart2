import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Server-side validation schema using zod
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(500, { message: "Message must be less than 500 characters" }),
});

/**
 * POST /api/contact-me
 * Handles contact form submissions and sends emails via Resend
 */
export async function POST(req) {
  try {
    // Parse form data from request
    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validate the input data
    const validationResult = contactFormSchema.safeParse({
      name,
      email,
      message,
    });

    if (!validationResult.success) {
      // Return validation errors
      const errors = validationResult.error.errors.map(err => err.message).join(', ');
      return NextResponse.json(
        { ok: false, message: `Validation failed: ${errors}` },
        { status: 400 }
      );
    }

    // Check for required environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { ok: false, message: 'Email service is not configured' },
        { status: 500 }
      );
    }

    if (!process.env.RESEND_FROM || !process.env.RESEND_TO) {
      console.error('RESEND_FROM or RESEND_TO is not configured');
      return NextResponse.json(
        { ok: false, message: 'Email service is not properly configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO,
      subject: `Portfolio Contact: Message from ${validationResult.data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #f4f4f4;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
              }
              .header h2 {
                margin: 0 0 10px 0;
                color: #2c3e50;
              }
              .content {
                background-color: #fff;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
              }
              .field {
                margin-bottom: 15px;
              }
              .field-label {
                font-weight: bold;
                color: #555;
                display: block;
                margin-bottom: 5px;
              }
              .field-value {
                color: #333;
              }
              .message-box {
                background-color: #f9f9f9;
                padding: 15px;
                border-left: 4px solid #2c3e50;
                margin-top: 10px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #777;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p>You have received a new message from your portfolio website.</p>
            </div>
            
            <div class="content">
              <div class="field">
                <span class="field-label">From:</span>
                <span class="field-value">${validationResult.data.name}</span>
              </div>
              
              <div class="field">
                <span class="field-label">Email:</span>
                <span class="field-value">
                  <a href="mailto:${validationResult.data.email}">${validationResult.data.email}</a>
                </span>
              </div>
              
              <div class="field">
                <span class="field-label">Message:</span>
                <div class="message-box">${validationResult.data.message}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>This email was sent from your portfolio contact form.</p>
            </div>
          </body>
        </html>
      `,
      // Plain text fallback
      text: `
New Contact Form Submission

From: ${validationResult.data.name}
Email: ${validationResult.data.email}

Message:
${validationResult.data.message}

---
This email was sent from your portfolio contact form.
      `,
    });

    // Handle Resend API errors
    if (error) {
      console.error('Resend API error:', error);
      return NextResponse.json(
        { ok: false, message: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { ok: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error in contact API:', error);
    return NextResponse.json(
      { ok: false, message: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

/**
 * Guard against non-POST methods
 */
export async function GET() {
  return NextResponse.json(
    { ok: false, message: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { ok: false, message: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { ok: false, message: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { ok: false, message: 'Method not allowed. Use POST to submit contact form.' },
    { status: 405 }
  );
}