const mailConfig = require('../../config/mail')

const path = require('path')
const nodemailer = require('nodemailer')
const exphbs = require('express-handlebars')
const nodemailerhbs = require('nodemailer-express-handlebars')

const transporter = nodemailer.createTransport(mailConfig)

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

transporter.on(
  'compile',
  nodemailerhbs({
    viewEngine: exphbs.create({
      extname: '.hbs',
      layoutsDir: path.resolve(viewPath, 'layouts'),
      partialsDir: path.resolve(viewPath, 'partials'),
      defaultLayout: 'default',
    }),
    viewPath,
    extName: '.hbs',
  })
)

module.exports = transporter
