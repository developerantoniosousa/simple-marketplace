const Ad = require('../models/Ad')
const User = require('../models/User')

const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store(req, res) {
    const { content } = req.body

    const customer = await User.findById(req.userId)
    const ad = await Ad.findById(req.body.ad).populate('author')

    Queue.createJob(PurchaseMail.key, { customer, ad, content }).save()

    return res.json(ad)
  }
}

module.exports = new PurchaseController()
