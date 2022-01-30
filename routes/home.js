const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'helpLoygift@gmail.com',
        pass: 'helpLoygift321',
    },
});
const email = "kaarov8@gmail.com"
module.exports = function (app, network_information) {
    app.get('/', function (req, res) {
        res.render('home.ejs');
    });
    app.post('/callback', function (req, res) {
        transporter.sendMail({
            from: 'asman', // sender address
            to: email, // list of receivers
            subject: "ОБРАТНЫЙ ЗВОНОК", // Subject line
            html: "<b> name: " + req.fields.name + " </b></br><b> phone: " + req.fields.phone + " </b>", // html body
        }).catch(console.error);
        res.status(200).json({ status: 200, msg: "Success" });
    });
}