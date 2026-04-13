import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function sanitize(value: unknown, maxLength = 500) {
  return String(value ?? '').trim().slice(0, maxLength)
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

type WaitlistPayload = {
  name: string
  email: string
  company: string
  role: string
  state: string
  city: string
  interested_in: string
}

type ValidationResult =
  | { ok: false; error: string }
  | { ok: true; data: WaitlistPayload }

function validateBody(body: any): ValidationResult {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Invalid request body' }

  const name = sanitize(body.name, 100)
  const email = sanitize(body.email, 254)
  const company = sanitize(body.company, 100)
  const role = sanitize(body.role, 100)
  const state = sanitize(body.state, 50)
  const city = sanitize(body.city, 100)
  const interested_in = sanitize(body.interested_in, 1000)

  if (!name) return { ok: false, error: 'Name is required' }
  if (!email || !isValidEmail(email)) return { ok: false, error: 'A valid email is required' }
  if (!role) return { ok: false, error: 'Role is required' }

  return {
    ok: true,
    data: { name, email, company, role, state, city, interested_in },
  }
}

export async function POST(request: Request) {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const fromEmail = process.env.EMAIL_FROM
  const toEmail = process.env.EMAIL_TO

  if (!smtpHost || !smtpUser || !smtpPass || !fromEmail || !toEmail) {
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 })
  }

  const body = await request.json().catch(() => null)
  const validation = validateBody(body)
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 })
  }

  const { name, email, company, role, state, city, interested_in } = validation.data
  const timestamp = new Date().toISOString()
  const text = [
    `New early access request received (${timestamp})`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || 'N/A'}`,
    `Role: ${role}`,
    `City: ${city || 'N/A'}`,
    `State: ${state || 'N/A'}`,
    `Interested in: ${interested_in || 'N/A'}`,
  ].join('\n')

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: `Signal Crew early access request from ${name}`,
      text: text,
    })
  } catch (error) {
    return NextResponse.json({ error: `Email delivery failed: ${error instanceof Error ? error.message : String(error)}` }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
