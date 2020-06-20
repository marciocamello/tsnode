import { Response, Request } from 'express'

class HomeController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      return res.json({
        message: 'Typescript Application'
      })
    } catch (err) {
      return res.status(400).json({ error: err.message })
    }
  }
}

export default new HomeController()
