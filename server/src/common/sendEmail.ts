import nodemailer from 'nodemailer'

const fromEmail = 'hagiangvo1808@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: fromEmail,
        pass: process.env.GMAIL_PASSWORD,
    },
})

export async function sendEmail(
    toEmail: string,
    subject: string,
    content: string,
    callback: Function
) {
    const info = await transporter.sendMail({
        from: fromEmail,
        to: toEmail,
        subject: subject,
        html: content,
    })
    transporter.sendMail(info, (err: any) => callback())
}
