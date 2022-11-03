const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendPasswordMail(to, password) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Password for site",
            text: '',
            html:
                `
                    <div>
                        <h1>Your password:</h1>
                        <h2>${password}</h2>
                        
                    </div>
                `
        })
    }
}

module.exports = new MailService();