const Queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');
Queue.process('emails',function(job, done){
    console.log('emails worker is processing a job',job.data);
    commentsMailer.newComment(job.data);
    done[0];
});