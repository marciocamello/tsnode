import { Response, Request } from 'express'
import { User } from '@schemas/User'

class UserController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await User.find()

    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    try {
      const user = await User.create(req.body)

      return res.json(user)
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      await User.update({ _id: req.params.id }, req.body)

      req.body.password = undefined

      return res.json({
        _id: req.params.id,
        ...req.body
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      await User.remove({ _id: req.params.id })

      return res.json({ message: 'User deleted with success' })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new UserController()
