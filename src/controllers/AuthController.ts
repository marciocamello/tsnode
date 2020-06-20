import { Response, Request } from 'express'
import { User } from '@schemas/User'
import bcrypt from 'bcryptjs'

class AuthController {
  public async register (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.create(req.body)

      return res.json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  public async authenticate (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+passsowrd')

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid password' })
    }

    user.password = undefined

    return res.json({
      user,
      token: user.generateToken()
    })
  }
}

export default new AuthController()
