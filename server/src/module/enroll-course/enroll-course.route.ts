import express from 'express'
import { body } from 'express-validator'
import { EnrollCourse } from './enroll-course.model'

export const EnrollCourseRouter = express
    .Router()
    // Get all enroll-course
    .get('/', async (req, res) => {
        const enrollCourse = await EnrollCourse.find()

        res.json(enrollCourse)
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const enrollCourse = await EnrollCourse.findOneBy({ id: id })

        res.json(enrollCourse)
    })

    .post('/', async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const enrollCourse = new EnrollCourse()
        enrollCourse.score = data.name
        enrollCourse.note = data.code
        await enrollCourse.save()

        res.json(enrollCourse)
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await EnrollCourse.delete({ id: id })
        res.json(result)
    })
