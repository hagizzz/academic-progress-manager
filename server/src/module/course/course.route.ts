import express from 'express'
import { body } from 'express-validator'
import { Course } from './course.model'

export const courseRouter = express
    .Router()
    // Get all course
    .get('/', async (req, res) => {
        const courses = await Course.find({ relations: { classroom: true, subject: true } })

        res.json(courses)
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const course = await Course.findOneBy({ id: id })

        res.json(course)
    })

    .post('/', async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const course = new Course()
        course.year = data.name
        course.term = data.code
        await course.save()

        res.json(course)
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Course.delete({ id: id })
        res.json(result)
    })
