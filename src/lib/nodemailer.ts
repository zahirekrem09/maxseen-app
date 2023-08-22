import nodemailer from 'nodemailer'
import { eventEmitter } from './events/eventEmitter'

const email = process.env.EMAIL_USER || 'bbankdummymail@gmail.com'
const pass = process.env.EMAIL_PASS || 'bbank2021..'

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'hypnotescorp@gmail.com' ?? email,
    pass: 'lgikycibsbweiwxx',
  },
})

export const sendEmail = () => {
  eventEmitter.on('send_mail', data => {
    console.log('send mail', data)
    // create reusable transporter object using the default SMTP transport

    // send mail with defined transport object
    transporter
      .sendMail({
        from: process.env.EMAIL_FROM, // sender address
        ...data,
      })
      .then(info => console.log('Message sent: %s', info.messageId))
      .catch(err => console.log('Error: %s', err))
  })
}
