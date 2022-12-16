const nodemailer=require("nodemailer")

const {Username,Password}=require("../config/credentials")

const SMTP_PORT=587
const HOST_SERVICE="smtp-relay.sendinblue.com";

const SENDER_EMAIL=Username
const RECIVER_EMIAL="vepalisantosh@gmail.com"

const CC=[]
const BCC=[]

const EMAIL_SUBJECT="Happy Birthday"
const EMAIL_BODY="<h1>Happy birthday</h1>"

const options={
    from: SENDER_EMAIL,
    to: RECIVER_EMIAL,
    cc:CC,
    bb:BCC,
    subject:EMAIL_SUBJECT,
    html: EMAIL_BODY
}

const transporter=nodemailer.createTransport({
    host: HOST_SERVICE,
    port: SMTP_PORT,
    secure: false,
    auth:{
        user: "vepalisantosh@gmail.com",
        pass: "8VB1MWjTqPJFHsZ2"
    }
})





module.exports={transporter,options}