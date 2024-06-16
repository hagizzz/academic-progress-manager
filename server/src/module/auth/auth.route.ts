import express from 'express'
import { body } from 'express-validator'
import bcrypt from 'bcrypt'
import { fieldValidator } from '@/common/middleware/fieldValidator.middleware'
import { loginValidation } from './auth.validation'
import { Staff } from '../staff/staff.model'
import jwt from 'jsonwebtoken'
import { Role, UserJWT, getPermissions } from './auth.utils'

export const authRouter = express
    .Router()

    .post('/login', fieldValidator(loginValidation), async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const staff = await Staff.findOneBy({
            email: data.email,
        })
        if (staff == null) {
            return res.status(401).send()
        }
        const isMatchPassword = await bcrypt.compare(data.password, staff.password)
        if (!isMatchPassword) {
            return res.status(401).send()
        }

        const payload = {
            id: staff.id,
            email: staff.email,
            role: staff.role,
        }

        const token = jwt.sign(payload, process.env.SECRET, {
            expiresIn: '7d',
        })

        res.cookie('token', token)

        res.json({ token })
    })

    .get('/permissions', async (req, res) => {
        const userData = res.locals.userData as UserJWT
        const permissions = getPermissions(userData.role)

        res.json(permissions)
    })
