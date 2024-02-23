import express from 'express'
import { body } from 'express-validator'
import { Classroom } from './classroom.model'

export const classroomRouter = express
    .Router()
    // Get all classroom
    .get('/', async (req, res) => {
        const classrooms = await Classroom.find({ relations: { major: true, educationType: true } })

        res.json(classrooms)
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const classroom = await Classroom.findOneBy({ id: id })

        res.json(classroom)
    })

    .post('/', async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const classroom = new Classroom()
        classroom.code = data.code
        await classroom.save()

        res.json(Classroom)
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Classroom.delete({ id: id })
        res.json(result)
    })
