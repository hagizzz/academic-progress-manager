import express from 'express'
import { Role, UserJWT, getPermissions } from '../auth/auth.utils'
import { Staff } from '../staff/staff.model'

export const indexRouter = express.Router()
