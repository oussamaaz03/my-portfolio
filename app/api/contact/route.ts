import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}
    `

    // For now, we'll log the message and return success
    console.log("[v0] Contact form submission:", emailContent)

    // Example with Resend (you would need to install and configure it):
    // await resend.emails.send({
    //   from: 'portfolio@yourdomain.com',
    //   to: 'oussamaelazzouzi03@gmail.com',
    //   subject: `New message from ${name}`,
    //   text: emailContent,
    // })

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
