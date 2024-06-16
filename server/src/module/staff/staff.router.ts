import express from 'express'
import { body } from 'express-validator'
import { Staff } from './staff.model'
import bcrypt from 'bcrypt'
import { fieldValidator } from '@/common/middleware/fieldValidator.middleware'
import { createValidation } from './staff.validation'
import { Permission, Role, UserJWT, getPermissions } from '../auth/auth.utils'
import { requirePermission } from '../auth/auth.middleware'
import { Like, MoreThan } from 'typeorm'

export const staffRouter = express
    .Router()
    .get('/', requirePermission(Permission.ReadStaff), async (req, res) => {
        const limit = parseInt(req.query.limit.toString()) || 10
        const page = parseInt(req.query.page.toString()) || 1
        const search = req.query.search
        const [staffs, count] = await Staff.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            where: [
                { fullname: search ? Like(`%${search}%`) : null, id: MoreThan(0) },
                { code: search ? Like(`%${search}%`) : null, id: MoreThan(0) },
            ],
        })

        res.json({
            staffs,
            paging: {
                limit,
                page,
                total: count,
            },
        })
    })

    .get('/profile', requirePermission(Permission.BeUser), async (req, res) => {
        const userData = res.locals.userData as UserJWT
        const staff = await Staff.findOneBy({ id: userData.id })
        const pers = getPermissions(staff.role)
        const profile: UserJWT & Staff = {
            ...res.locals.userData,
            ...staff,
            permissions: pers,
        }
        delete profile.password
        res.send(profile)
    })

    .get('/:id', requirePermission(Permission.ReadStaff), async (req, res) => {
        const id = parseInt(req.params.id)
        const staff = await Staff.findOneBy({ id: id })

        res.json(staff)
    })

    .post(
        '/',
        requirePermission(Permission.AddStaff),
        fieldValidator(createValidation),
        async (req, res) => {
            const data = req.body
            // data.password = await bcrypt.hash(data.password, 10)

            const staff = new Staff()
            staff.fullname = data.fullname
            staff.email = data.email
            staff.password = ''
            await staff.save()

            res.json(staff)
        }
    )

    .delete('/:id', requirePermission(Permission.DeleteStaff), async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Staff.delete({ id: id })
        res.json(result)
    })
