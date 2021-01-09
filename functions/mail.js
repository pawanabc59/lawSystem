var nodemailer = require('nodemailer');

function sendMail(name,password,email,role){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourmail@gmail.com',
      pass: 'yourpassword'
    }
  });

  var mailOptions = {
    from: 'Admin <yourmail@gmail.com>',
    to: email,
    subject: 'Account created as '+role+' from LawSystem',
    text: 'Hey '+name+', Admin here. \nYou have been successfully registered on LawSystem and your password is '+password+'.\n\nThanks and Regards,Admin :)'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function approvedMail(victimName, victimEmail, lawyerName, casePDF){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourmail@gmail.com',
      pass: 'yourpassword'
    }
  });

  var mailOptions = {
    from: 'Admin <yourmail@gmail.com>',
    to: victimEmail,
    subject: 'Case Approved by '+lawyerName+'.',
    text: 'Hey '+victimName+', Admin here. \n Your case has been approved by '+lawyerName+'.\nNow '+lawyerName+' will fight your case. \nAll the best for the future.\n\nThanks and Regards,Admin :)',
    attachments: [{
    filename: 'casePDF.pdf',
    path: 'C:/xampp/htdocs/projects/lawSystem/public/uploads/user/'+victimEmail+'/'+casePDF+'',//attachment
    contentType: 'application/pdf'
  }]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function approvedMailLawyer(victimName, victimEmail, lawyerName, lawyerEmail, casePDF){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourmail@gmail.com',
      pass: 'yourpassword'
    }
  });

  var mailOptions = {
    from: 'Admin <yourmail@gmail.com>',
    to: lawyerEmail,
    subject: 'You Approved case of '+lawyerName+'.',
    text: 'Hey '+lawyerName+', Admin here. \n You have approved the case of '+victimName+'\nNow you will fight the case of '+victimName+'. \nAll the best for the future.\n\nThanks and Regards,Admin :)',
    attachments: [{
    filename: 'casePDF.pdf',
    path: 'C:/xampp/htdocs/projects/lawSystem/public/uploads/user/'+victimEmail+'/'+casePDF+'',//attachment
    contentType: 'application/pdf'
  }]
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

function rejectedMail(victimName, victimEmail, lawyerName, reasonForRejection){

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourmail@gmail.com',
      pass: 'yourpassword'
    }
  });

  var mailOptions = {
    from: 'Admin <yourmail@gmail.com>',
    to: victimEmail,
    subject: 'Case Rejected by '+lawyerName+'.',
    text: 'Hey '+victimName+', Admin here. \n Your case has been Rejected by '+lawyerName+'.\n Please find some other lawyer.\n Reason For Rejection : \n '+reasonForRejection+' \n\nAll the best for the future.\n\nThanks and Regards,Admin :)',
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

// function sendTicket(name,eventName,email,attachment,cb){

//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'eventmania82@gmail.com',
//       pass: 'eventmania@1234'
//     }
//   });

//   var mailOptions = {
//     from: 'eventmania82@gmail.com',
//     to: email,
//     subject: 'Successfully Registered',
//     text: 'Hey '+name+', Admin here. You have been successfully registered for '+eventName+'.\nFor more details check the ticket.\n\n\n\nThanks and Regards,Admin :)',
//     attachments: [{
//     filename: 'file.pdf',
//     path: 'C:/wamp/www/EventMania/files/quotation.pdf',//attachment
//     contentType: 'application/pdf'
//   }]
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//       cb(error,info);
//   });

// }


module.exports= { sendMail, approvedMail, rejectedMail, approvedMailLawyer };
