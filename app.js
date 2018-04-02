var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

var port = process.env.PORT || 3000;

var smtpTransport = nodemailer.createTransport("SMTP", {

    service: 'Gmail',
    auth: {
        user: 'send2asmitaraj@gmail.com',
        pass: 'send2asmita'
    }
});

var  urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.use('/', express.static('assets'));

app.get('/', function(req, res){
	res.render('index');
});

app.get('/send', function (req, res) {

    var mailOptions = {
        to: req.query.to,
        subject: 'Contact Form Message',
        from: "Contact Form Request" + "<" + req.query.from + '>',
        html:  "From: " + req.query.name + "<br>" +
               "User's email: " + req.query.user + "<br>" +     "Message: " + req.query.text
    }

    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (err, response) {
        if (err) {
            console.log(err);
            res.end("error");
        } else {
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });

});



app.listen(port, function (err) {
    if (err) {
        console.log(err);
    } else {
    	console.log(port);
        console.log("Listening on port on 3000");
    }
}); 