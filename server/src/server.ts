import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import '@/database'
import { staffRouter } from './module/staff/staff.router'
import { studentRouter } from './module/student/student.route'
import { subjectRouter } from './module/subject/subject.router'
import { courseRouter } from './module/course/course.route'
import { classroomRouter } from './module/class/classroom.route'

const server = express()
const PORT = process.env.PORT || 3000

server.use(cors())
server.use(bodyParser.json())

server.use('/staffs', staffRouter)
server.use('/students', studentRouter)
server.use('/subjects', subjectRouter)
server.use('/courses', courseRouter)
server.use('/classrooms', classroomRouter)
server.get('/', (req, res) => {
    res.send('welcome to my server')
})

server.listen(PORT, () => {
    console.log('Server is running')
})
