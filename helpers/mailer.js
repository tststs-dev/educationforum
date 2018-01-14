const nodemailer = require('nodemailer');
const config = require('config');
const xoauth2 = require('xoauth2');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        type: 'OAuth2',
        user: 'mir.zayavki@gmail.com',
        clientId: "628624107240-ph94b9ct5172osgsrcab4ftggn6q76mp.apps.googleusercontent.com",
        clientSecret: "pzTgqa5QzBdqDu_uxff0BHZM",
        refreshToken: "1/iNMPBOzyObm4dFrPMnjESWsgsxu7GA0lx76CtiiKV0c"
    }
});

module.exports.transporter = transporter;


let createRegisterMessage = function (to, link) {
    return {
        from: 'Education Forum 2018 <foo@blurdybloop.com>', // sender address
        to: to, // list of receivers
        subject: 'Account verification', // Subject line
        html: "Hi, you successfully registered in our website. To verify your account click on " +
        "<a target=\"_blank\" href=\"http://" +  config.ipv4 + ":" + config.httpPort + "/api/session/confirm-email?hash=" + link + "\">link </a>",

    };
};

module.exports.sendRegisterMessage = function (user, link) {
    return new Promise((resolve, reject) => {
        let options = createRegisterMessage(user.email, link);
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            resolve(user.email);
        });
    });
};
