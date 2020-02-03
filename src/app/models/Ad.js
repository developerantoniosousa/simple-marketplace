const mongoose = require('mongoose')

const AdSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ad', AdSchema)
