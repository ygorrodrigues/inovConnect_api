const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

class UserEmail {
  sendConfirmationEmail(id, email) {
    jwt.sign({ id }, process.env.EMAIL_SECRET, {
      expiresIn: '1d'
    }, (err, emailToken) => {
      if (err) {
        db.users.destroy({
          where: {
            id: id
          }
        })
        throw Error(err)
      }
      const url = `http://localhost:3000/confirmation/${emailToken}`
      transporter.sendMail({
        to: email,
        subject: 'Confirmar usuário InovConnect',
        html: `Por favor clique no link para confirmar sua conta: <a href="${url}">${url}</a>`
      })
    })
  }
  
  sendResetEmail(id, email) {
    jwt.sign({ id }, process.env.PASSWORD_RESET_SECRET, {
      expiresIn: '120m'
    }, (err, passwordResetToken) => {
      if (err) {
        throw Error(err)
      }
      const url = `http://localhost:3000/resetpass/${passwordResetToken}`
      transporter.sendMail({
        to: email,
        subject: 'Mudar senha InovConnect',
        html: `Por favor clique no link para inserir uma nova senha na sua conta: <a href="${url}">${url}</a>`
      })
    })
  }
}

module.exports = new UserEmail