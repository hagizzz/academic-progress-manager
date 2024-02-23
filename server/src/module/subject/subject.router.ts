import express from 'express'
import { body } from 'express-validator'
import { Subject } from './subject.model'

export const subjectRouter = express
    .Router()
    // Get all subjects
    .get('/', async (req, res) => {
        const subjects = await Subject.find()

        res.json(subjects)
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const subject = await Subject.findOneBy({ id: id })

        res.json(subject)
    })

    .post('/', async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const subject = new Subject()
        subject.name = data.name
        subject.code = data.code
        await subject.save()

        res.json(subject)
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Subject.delete({ id: id })
        res.json(result)
    })
