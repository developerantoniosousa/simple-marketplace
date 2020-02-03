const Mail = require('../services/Mail')

class PurchaseMail {
  get key() {
    return 'PurchaseMail'
  }

  async handle(job, done) {
    const { content, ad, customer } = job.data

    Mail.sendMail({
      from: 'Antonio Sousa <developerantoniosousa@gmail.com>',
      to: `${ad.author.name} <${ad.author.email}>`,
      replyTo: `${customer.name} <${customer.email}>`,
      subject: `Você tem uma nova solicitação de compra para ${ad.title}`,
      template: 'purchase',
      context: { ad, customer, content },
    })

    return done()
  }
}

module.exports = new PurchaseMail()
