import { createTransport } from "nodemailer";
const dotenv = require("dotenv");
dotenv.config();

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export default transporter;
