var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test@gmail.com',
    pass: 'test'
  }
});

var mailOptions = {
  from: 'test@gmail.com',
  to: 'dat@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'this is test!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});