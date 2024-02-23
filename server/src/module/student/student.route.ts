import express from 'express'
import { body } from 'express-validator'
import { Student } from './student.model'

export const studentRouter = express
    .Router()
    // Get all students
    .get('/', async (req, res) => {
        const students = await Student.find()

        res.json(students)
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const student = await Student.findOneBy({ id: id })

        res.json(student)
    })

    .post('/', async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const student = new Student()
        student.fullname = data.fullname
        student.email = data.email
        await student.save()

        res.json(student)
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Student.delete({ id: id })
        res.json(result)
    })
