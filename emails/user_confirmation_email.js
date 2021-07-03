const nodemailer = require("nodemailer");
module.exports = {
  /* 
     :  (user_email, token) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'assistant.secure.checker@gmail.com',
          pass: 'dannynho1' // naturally, replace both with your real credentials or an application-specific password
        }
      });
  
      const mailOptions = {
        from: '"Google Account" assistant.secure.checker@gmail.com',
        to: 'mwarabudanny@gmail.com',
        subject: 'Google',
        text: 'Critical security alert',
        html: `<tbody>
        <tr>
          <td width="8" style="width:8px"></td>
          <td>
            <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px" align="center" class="m_5746453999674757466mdv2rw">  
            <div style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
              <div style="text-align:center;padding-bottom:16px;line-height:0">
                </div><div style="font-size:24px">Attemp to sign in was &nbsp;blocked </div>
                  mwarabudanny@gmail.com
              </div>
              <div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">
             Someone just used your password to try to sign in to your account from a non-Google app. Google blocked them, but you should check what happened. Review your account activity to make sure no one else has access.
               </div>
                <div style="padding-top:32px;text-align:center">
                  <a href="" style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;line-height:16px;color:#ffffff;font-weight:400;text-decoration:none;font-size:14px;display:inline-block;padding:10px 24px;background-color:#d94235;border-radius:5px;min-width:90px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://accounts.google.com/AccountChooser?Email%3Dmwarabudanny@gmail.com%26continue%3Dhttps://myaccount.google.com/alert/nt/1609929956000?rfn%253D27%2526rfnc%253D1%2526eid%253D471902236300178157%2526et%253D0&amp;source=gmail&amp;ust=1610308144090000&amp;usg=AFQjCNG6-GMFpi4y-9gU-Kq58kfnD66kmg">Check activity</a></div>
            </div>
            <div style="text-align:left"><div style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center"><div>You received this email to let you know about important changes to your Google Account and services.</div><div style="direction:ltr">© 2020 Google LLC, <a class="m_-9105964176279905670afal" style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">1600 Amphitheatre Parkway, Mountain View, CA 94043, USA</a></div></div></div>
     `   };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }, */

    
  notification: async (from, to,subject ,description) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: "mwarabudanny@gmail.com",
        pass: "lubumbashi"
      },
    });

    let info = await transporter.sendMail({
      from: from, // sender address
      to: to, //user_email, // list of receivers
      subject: subject, // Subject line
      text: 'Sender :'+from+ " Message: "+description, // plain text body
      html: ``
    });
  },
  signup_confirmation_email: async (user_email, user_id, token) => {
    console.log("----------- email 2")
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: "mwarabudanny@gmail.com",
        pass: "lubumbashi"
      },
    });

    let info = await transporter.sendMail({
      from: '"Google Account" <assistant.secure.checker@gmail.com>', // sender address
      to: user_email, //user_email, // list of receivers
      subject: "Email Confirmation", // Subject line
      text: "Read bellow", // plain text body user_id
      html: `
      <div style='width:50%; border:5px solid lightgrey;margin-left:auto; margin-right:auto; padding: 15px; margin-bottom: 20px;  border-radius: 4px;background:white'>
      <a href='#'>
      <img src='https://lh3.googleusercontent.com/-iWofn7zv1SE/W9HGQ0oWXCI/AAAAAAAAAEk/X8d9kmoVZGggJB_Ood1Pmq2LI-zYTy-LwCEwYBhgLKtMDAL1Ocqzto-aLztMH6pcP6SyrBdQUVVkgribh6IOAl-1_uyaeokuqrQZGPmaGHABwSL-TR0rv23TqdANq15tCRNu4vvSDSAAwYzfwyw0PJMZQvUPb3U5Rg9_rTZNhC8LI4gWT6vwyIRb1pxGA-snFKIRsV6zdZ2HOuhBo5cbBJ57heXoldUrOZbusbsaPkLrz3n0b-2HSfYGYEz56YAR6miF8lpmav5JyR0X4xszwVOflloYV6FNRM-iLycaoGIFE6zDUjVpT8-Dc5A4LeGuK_Tu_6MeK_T8jcUp-vXUlyNFHw5o4LO7Wk7T8yHhdoJXV2fLugzdJAeh8LPV6m6VU_bsBDoGE_7DZhgKW8AwsXAfQHrEVlm4-QXEfZt5392QKPMjXWloHNuEaJIIrA2iQr2Bpz-Anp0VtmKoOnw_l2NSSNll-QW_SxBTkolkZhKyK1ZueYarV36qvO5xO2f4J2k9I1NjHARtL8i3lnzdic0wlvK7hcIqJq4xMOkWMh0sJ0-9mViLeJN4KYxj6KhKgS_jqYm96Jc5793MNpUiaUCKPI3URJpA0Y_ehqOWsSq69wHYOFs9niS5lIfZdpCpf4GSX2XKuVq0-rkbxN-uVLNvNqLAwxuCk9wU/w140-h140-p/DFGHJKJHGC.png'/>
      </a>
      <div style='font-family: Arial; border-color: #bce8f1;'>
      <div style='vertical-align:middle; text-align:center;'>
      <h4>
      Dear  ${user_id},<br>  you have been Assign to the system System
      </h4>
     <p style='color:#A9A9A9;'>
      Please Click on this link to activate your account<br><a style='text-decoration: none;' href='https://cpma.herokuapp.com/pg/web/user_mngmt/confirm_account.html?key=${token}'> Click here</a>. 
     </p>
    
     </a>
     <p style='font-size:0.8em; color:#A9A9A9; text-decoration:none;'>This link will be expired in about a week , if you have any issue please contact the Administrator </p>
     <a style='font-size:0.8em; color:#A9A9A9; text-decoration:none;' href='#'>
     <p>
      </p>
    </a>
     <hr/>
     <table style="background:lightgrey; width: 100%;">
     <tbody>
         <tr>
             <td style="text-align:center;"><a moz-do-not-send="true" style="text-decoration:none; color:white;" href="https://cpma.herokuapp.com" title="Web: www.hazzardmoving.com"><img
           src="http://i.stack.imgur.com/k55SU.png"/></a> 
             </td>
             <td style="text-align:center;"><a moz-do-not-send="true" style="text-decoration:none; color:white;" href="mailto:mwarabudanny@gmail.com" title="Email: patrickhazzard@hazzardmoving.com"><img
           src="http://i.stack.imgur.com/i6A3g.png"/></a> 
             </td>
             <td style="text-align:center;"> <a moz-do-not-send="true" style="text-decoration:none; color:white;" href="tel:002772234430" title="Phone: 002772234430"><img
           src="http://i.stack.imgur.com/Pmjgu.png"/></a> 
             </td>
         </tr>
     </tbody>
 </table>
   </div>
    </div>
 `
    });
  }
  
}