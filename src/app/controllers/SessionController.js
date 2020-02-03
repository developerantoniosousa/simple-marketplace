const User = require('../models/User')

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' })
    }

    delete user.password

    return res.json({ user, token: User.generateToken(user) })
  }
}

module.exports = new SessionController()
