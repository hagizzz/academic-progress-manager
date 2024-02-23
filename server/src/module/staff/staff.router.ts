import express from 'express'
import { body } from 'express-validator'
import { Staff } from './staff.model'
import bcrypt from 'bcrypt'
import { fieldValidator } from '@/common/middleware/fieldValidator.middleware'
import { createValidation } from './staff.validation'

export const staffRouter = express
    .Router()
    // Get all users
    .get('/', async (req, res) => {
        const staffs = await Staff.find()

        res.json(staffs)
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const staff = await Staff.findOneBy({ id: id })

        res.json(staff)
    })

    .post('/', fieldValidator(createValidation), async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const staff = new Staff()
        staff.fullname = data.fullname
        staff.email = data.email
        staff.password = ''
        await staff.save()

        res.json(staff)
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Staff.delete({ id: id })
        res.json(result)
    })
