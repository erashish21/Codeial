const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlStrong = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment');
    console.log('inside newComment mailer', comment);

    nodeMailer.transporter.sendMail({
       from: 'bundelaa979@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlStrong 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

     //   console.log('Message sent', info);
        return;
    });
}