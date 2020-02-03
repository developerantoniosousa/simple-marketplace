const User = require('../models/User')

class UserController {
  async store(req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(401).json({ error: 'User already exists' })
    }

    const { name, id } = await User.create(req.body)

    return res.json({ id, name, email })
  }
}

module.exports = new UserController()
