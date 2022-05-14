const nodemailer = require('nodemailer');
const MAIL_PASSWORD = require('../secure/pass');

const send = async (url,signupuser,title,desc)=>{
// here we create a transporter who will send mail it will contain service name and authortication detail
let mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth:{
    user:"surajgusain2002@gmail.com",
    pass:MAIL_PASSWORD
  },
  tls:{
    rejectUnauthorized:false
}
})

// declare a variable mailDetails that contains the sender and receiver email id, subject and content of the mail.
    let mailDetails = {
      from:"surajgusain2002@gmail.com",
      to:signupuser.email,
      subject:title,
      text:`${desc}  ${url} `
    }

    // Use mailTransporter.sendMail() function to send email from sender to receiver. If message sending failed or contains error then it will display error message otherwise message send successfully.
    await mailTransport.sendMail(mailDetails,(err,data)=>{
      if(err){
        console.log("error occurs: "+err);
      }
      else{
        console.log("sent successfully");
        // console.log(data);

      }
    })
};
module.exports = send;