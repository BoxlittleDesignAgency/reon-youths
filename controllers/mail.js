const mailer = require("nodemailer");
const sendMail = (req, res) => {
  
}

const getEmailData = (to, name, template) => {
  let data = null;

  switch(template) {
    case "hello":
      data = {
        from: "John Ahn <adereactive@gmail.com>",
        to,
        subject: `Hello ${name}`,
        html: Hello()
      }
      break;

      case "thanks":
        data = {
          from: "John Ahn <adereactive@gmail.com>",
          to,
          subject: `Hello ${name}`,
          html: Thanks()
        }
        break; 

        default:
          data;
  }

  return data;
}

const emailSend = (to, name, type) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user:"adereactive@gmail.com",
      pass: "1234567"
    }
  })

  const mail = getEmailData(to, name, type);

  smtpTransport.sendMail(mail, function(error, response) {
    if(error) {
      console.log(error)
    } else {
      console.log("Email sent successfully")
    }

    smtpTransport.close()
  })
}

module.exports = {
  sendMail
};