import { NextFunction, Response, Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { secrets } from '../config/secrets'
import { User } from '../schemas/User'
import { JwtInterface } from '../interfaces/Jwt'

async function jwtMiddleware (req: Request, res: Response, next: NextFunction): Promise<Response> {
  try {
    const authHeader = req.headers.authorization
    const bearerRegex = /(^Bearer (.*))/gm
    const token = bearerRegex.exec(authHeader)

    const decoded = jwt.verify(token[2], secrets.JWT_SECRET) as JwtInterface
    await User.findOne({ _id: decoded.id })

    next()
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
}

export default jwtMiddleware
