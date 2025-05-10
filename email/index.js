// fdwx xmjw oosx jkbj
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'edohovakimyan555@gmail.com',
    pass: 'fdwx xmjw oosx jkbj',
  },
});

module.exports.sendEmail = (to, subject, html) => {
  const obj = {
    from: 'edohovakimyan555@gmail.com',
    to,
    subject,
    html,
  };
  transporter.sendMail(obj, function (err, data) {
    if (err) err;
    console.log(data);
  });
};
