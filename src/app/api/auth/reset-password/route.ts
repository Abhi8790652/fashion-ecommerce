import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { getLocalStorage } from '@/utils/storage'

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
})

// Store reset tokens (in a real app, use a database)
const resetTokens = new Map<string, { token: string; expires: number }>()

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Check if user exists in localStorage
    const storedUser = getLocalStorage('user')
    if (!storedUser || storedUser.email !== email) {
      return NextResponse.json(
        { error: 'No account found with this email address' },
        { status: 404 }
      )
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex')
    const expires = Date.now() + 3600000 // Token expires in 1 hour

    // Store the token
    resetTokens.set(email, { token, expires })

    // Create reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello ${storedUser.name || 'there'},</p>
          <p>We received a request to reset your password. Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this password reset, you can safely ignore this email.</p>
          <p>Best regards,<br>Your App Team</p>
        </div>
      `,
    }

    // Send the email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Password reset email error:', error)
    return NextResponse.json(
      { error: 'Failed to send password reset email' },
      { status: 500 }
    )
  }
}

// Verify token endpoint
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Missing token or email' },
        { status: 400 }
      )
    }

    const storedData = resetTokens.get(email)
    if (!storedData || storedData.token !== token || Date.now() > storedData.expires) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    )
  }
}

// Update password endpoint
export async function PUT(request: Request) {
  try {
    const { token, email, newPassword } = await request.json()

    if (!token || !email || !newPassword) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const storedData = resetTokens.get(email)
    if (!storedData || storedData.token !== token || Date.now() > storedData.expires) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    // Update user's password in localStorage
    const storedUser = getLocalStorage('user')
    if (!storedUser || storedUser.email !== email) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Update the password
    storedUser.password = newPassword
    localStorage.setItem('user', JSON.stringify(storedUser))

    // Remove the used token
    resetTokens.delete(email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Password update error:', error)
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    )
  }
} 