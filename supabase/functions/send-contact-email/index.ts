import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const apiKey = Deno.env.get("RESEND_API_KEY");
console.log("RESEND_API_KEY available:", !!apiKey);

if (!apiKey) {
  console.error("RESEND_API_KEY is missing from environment variables");
  throw new Error("RESEND_API_KEY environment variable is required");
}

const resend = new Resend(apiKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Rate limiting storage (in-memory for simplicity)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // 5 requests per minute per IP

interface ContactEmailRequest {
  name: string;
  email: string;
  company: string;
  interestedIn: string;
  message: string;
}

// HTML escaping function to prevent XSS attacks
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Input validation function
function validateInput(data: ContactEmailRequest): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Name validation
  if (!data.name || data.name.trim().length === 0) {
    errors.push("Name is required");
  } else if (data.name.length > 100) {
    errors.push("Name must be less than 100 characters");
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Valid email is required");
  } else if (data.email.length > 254) {
    errors.push("Email must be less than 254 characters");
  }
  
  // Company validation
  if (!data.company || data.company.trim().length === 0) {
    errors.push("Company is required");
  } else if (data.company.length > 200) {
    errors.push("Company name must be less than 200 characters");
  }
  
  // InterestedIn validation
  if (!data.interestedIn || data.interestedIn.trim().length === 0) {
    errors.push("Interest selection is required");
  } else if (data.interestedIn.length > 100) {
    errors.push("Interest selection must be less than 100 characters");
  }
  
  // Message validation
  if (!data.message || data.message.trim().length === 0) {
    errors.push("Message is required");
  } else if (data.message.length > 2000) {
    errors.push("Message must be less than 2000 characters");
  }
  
  return { isValid: errors.length === 0, errors };
}

// Rate limiting function
function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const key = clientIP;
  
  // Clean up expired entries
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
  
  const currentData = rateLimitStore.get(key);
  
  if (!currentData || now > currentData.resetTime) {
    // First request or window expired
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }
  
  if (currentData.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }
  
  currentData.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - currentData.count };
}

// Security logging function
function logSecurityEvent(event: string, details: any, req: Request) {
  const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  
  console.log(`[SECURITY] ${event}:`, {
    timestamp: new Date().toISOString(),
    clientIP,
    userAgent,
    details
  });
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limiting
    const rateLimitResult = checkRateLimit(clientIP);
    if (!rateLimitResult.allowed) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { clientIP }, req);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(Date.now() + RATE_LIMIT_WINDOW).toISOString(),
            ...corsHeaders,
          },
        }
      );
    }

    console.log("Contact form request received from:", clientIP);
    
    const { name, email, company, interestedIn, message }: ContactEmailRequest = await req.json();

    // Validate input data
    const validation = validateInput({ name, email, company, interestedIn, message });
    if (!validation.isValid) {
      logSecurityEvent('INPUT_VALIDATION_FAILED', { errors: validation.errors, clientIP }, req);
      return new Response(
        JSON.stringify({ error: "Validation failed", details: validation.errors }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            ...corsHeaders 
          },
        }
      );
    }

    console.log("Sending contact email for:", { name, email, company, interestedIn });

    // Escape HTML to prevent XSS attacks
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeCompany = escapeHtml(company);
    const safeInterestedIn = escapeHtml(interestedIn);
    const safeMessage = escapeHtml(message);

    const emailResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["marco.krebs.84@googlemail.com"],
      subject: `New Contact Form Submission from ${safeName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Company:</strong> ${safeCompany}</p>
        <p><strong>Interested In:</strong> ${safeInterestedIn}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        <hr>
        <p><em>This email was sent from the contact form on marcokrebs-consulting.de</em></p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);
    logSecurityEvent('CONTACT_FORM_SUBMITTED', { name: safeName, email: safeEmail, company: safeCompany }, req);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    logSecurityEvent('FUNCTION_ERROR', { error: error.message }, req);
    return new Response(
      JSON.stringify({ error: error.message, details: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);