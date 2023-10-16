import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});


export const sendResetMailHandler = async (email, resetToken, req, res) => {
    const mailOptions = {
        from: "Krish Jotaniya",
        to: email,
        subject: "Password Reset",
        html: emailTemplate(resetToken, email),
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: "Reset Password Sent Successfull!"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error!" })
    }
}

const emailTemplate = (resetToken, email) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Krish Jotaniya</title> 
    </head>
    <body>
        <h1>Password Reset</h1>
       <p>We have received a Password Reset request from this mail ${email}</p>
       <a href=http://localhost:${process.env.PORT}/verify/${resetToken}>Click On This Link To Reset Password</a>
       <br>
       <br>
       <p>By Krish Jotaniya</p>
    </body>
    </html>
    `
};