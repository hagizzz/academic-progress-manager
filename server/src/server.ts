import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import '@/database'
import { initDB } from '@/database'
import { staffRouter } from './module/staff/staff.router'
import { studentRouter } from './module/student/student.route'
import { subjectRouter } from './module/subject/subject.router'
import { courseRouter } from './module/course/course.route'
import { classroomRouter } from './module/class/classroom.route'
import { authRouter } from './module/auth/auth.route'
import { indexRouter } from './module/index/index.router'
import { sendEmail } from './common/sendEmail'
import { enrollCourseRouter } from './module/enroll-course/enroll-course.route'

initDB()
const server = express()
const PORT = process.env.PORT || 3000

server.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)
server.use(bodyParser.json())
server.use(cookieParser())

server.use('/', indexRouter)
server.use('/staffs', staffRouter)
server.use('/students', studentRouter)
server.use('/subjects', subjectRouter)
server.use('/courses', courseRouter)
server.use('/enroll-courses', enrollCourseRouter)
server.use('/classrooms', classroomRouter)
server.use('/auth', authRouter)
server.get('/', (req, res) => {
    res.send('welcome to my server')
})

server.listen(PORT, () => {
    console.log('Server is running')
})
