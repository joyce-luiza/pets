const dotenv = require("dotenv");
dotenv.config();
import transporter from "../../../config/email";

export default function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            return err;
        } else {
            return result;
        }
    });
}
