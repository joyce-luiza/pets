const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

export default function formatEmail({ subject, body }) {
    const source = fs.readFileSync(
        path.join(__dirname, "emailTemplate.hbs"),
        "utf8"
    );
    const template = handlebars.compile(source);
    return template({
        subject,
        body,
    });
}
