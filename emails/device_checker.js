const nodemailer = require("nodemailer");
module.exports = {
  power_off_email: async (user_email,sitename,time)=> {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: "mwarabudanny@gmail.com",
        pass: "lubumbashi"
      },
    });
  
    let info = await transporter.sendMail({
      from: '"SapienIO 👻"', // sender address
      to: user_email, //user_email, // list of receivers
      subject: "Power OFF @ :"+time, // Subject line
      text: "Read bellow", // plain text body
      html: `<div style='width:80%; border:5px solid #B32018;margin-left:auto; margin-right:auto; padding: 15px; margin-bottom: 20px;  border-radius: 4px;background:white'>
             <div style='font-family: Arial; border-color: #bce8f1;'>
             <div style='vertical-align:middle; text-align:center;'>
             <h2>
              Hi Dear Team leader the site ${sitename} is down, Please do go down for inspection
             </h2>             
          </div>
           </div>`
    });
} ,
 power_on_email: async (user_email,sitename,time)=> {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: "mwarabudanny@gmail.com",
      pass: "lubumbashi"
    },
  });

  let info = await transporter.sendMail({
    from: '"SapienIO "', // sender address
    to: user_email, //user_email, // list of receivers
    subject: "Power Back ON @ :"+time, // Subject line
    text: "Read bellow", // plain text body
    html: `<div style='width:80%; border:5px solid #B32018;margin-left:auto; margin-right:auto; padding: 15px; margin-bottom: 20px;  border-radius: 4px;background:white'>
           <div style='font-family: Arial; border-color: #bce8f1;'>
           <div style='vertical-align:middle; text-align:center;'>
           <h2>
            Hi Dear Team leader the site ${sitename} is back on.
           </h2>             
        </div>
         </div>`
  })
}

}