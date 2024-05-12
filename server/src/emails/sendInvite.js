const dotenv = require("dotenv");
dotenv.config();
import transporter from "../config/email";

export default function sendInvite(
    recipientEmail,
    senderName,
    organizationName,
    token
) {
    const body = `
     <p> Olá! </p>
     <p> ${senderName} te convidou para fazer parte da organização ${organizationName}.</p>
     <a href="http://localhost:3000/invited/${encodeURIComponent(
         token
     )}"> Criar conta</a>
     `;

    const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: process.env.FROM_EMAIL,
        subject: `${senderName} te convidou para a ${organizationName}`,
        html: body,
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            return result;
        }
    });
}
