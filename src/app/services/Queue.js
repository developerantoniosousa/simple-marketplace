const redisConfig = require('../../config/redis')

const kue = require('kue')
const Sentry = require('@sentry/node')
const PurchaseMail = require('../jobs/PurchaseMail')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(PurchaseMail.key, PurchaseMail.handle)

Queue.on('error', Sentry.captureException)

module.exports = Queue
