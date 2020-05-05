import { Schema, Model, model, Document } from 'mongoose'
import { UserInterface } from '../interfaces/User'
import { secrets } from '../config/secrets'
import bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'

export interface UserModel extends UserInterface, Document {
  fullName(): string
  generateToken(): string
  compareHash(): Promise<boolean>
}

const UserSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String
}, {
  timestamps: true
})

UserSchema.methods.fullName = function (): string {
  return this.firstName + ' ' + this.lastName
}

UserSchema.pre('save', async function hashPassword (next) {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
  compareHash (hash: string): Promise<boolean> {
    return bcrypt.compare(hash, this.password)
  },

  generateToken (): string {
    return jwt.sign({ id: this.id }, secrets.JWT_SECRET, {
      expiresIn: 86400
    })
  }
}

export const User: Model<UserModel> = model<UserModel>('User', UserSchema)
