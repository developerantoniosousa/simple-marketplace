const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, process.env.APP_SECRET, {
      expiresIn: 86400,
    })
  },
}

UserSchema.methods = {
  checkPassword(password) {
    return bcrypt.compare(password, this.password)
  },
}

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 8)
})

module.exports = mongoose.model('User', UserSchema)
