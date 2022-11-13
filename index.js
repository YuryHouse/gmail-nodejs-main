const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN || "yuryzhykharka@gmail.com";
let smtp_password = process.env.SMTP_PASSWORD || "pgslvvnswxerudal";


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password dehgyeuqbzyjorav
    }
});

app.get('/', function (req, res) {
    res.send('Hello');
});

app.post('/sendMessage', async function (req, res) {
// send mail with defined transport object
    let {name, email, message} = req.body;

    let info = await transporter.sendMail({
        from: "My profile page", // sender address
        to: "yurasz@yandex.by", // list of receivers
        subject: "HR message", // Subject line
        //text: "My mobile number: +1234567891011", // plain text body
        html:
            `<b>The message from portfolio contact form: </b>
            <div>Name: ${name}</div>
            <div>E-mail: ${email}</div>
            <div>Message: ${message}</div>`, // html body
    });
    res.send('Hey');
});

let port = process.env.PORT || 3010;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});