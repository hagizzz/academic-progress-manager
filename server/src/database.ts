import { DataSource } from 'typeorm'
import bcrypt from 'bcrypt'

import { Staff } from './module/staff/staff.model'
import { Student } from './module/student/student.model'
import { Subject } from './module/subject/subject.model'
import { Classroom } from './module/class/classroom.model'
import { Course } from './module/course/course.model'
import { Department } from './module/department/department.model'
import { EducationType } from './module/educationType/educationType.model'
import { EnrollCourse } from './module/enroll-course/enroll-course.model'
import { Major } from './module/major/major.model'
import { Specialization } from './module/specialization/specialization.model'
import { Role } from './module/auth/auth.utils'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,

    logging: false,
    synchronize: true,

    entities: [
        Staff,
        Student,
        Subject,
        Classroom,
        Course,
        Department,
        EducationType,
        EnrollCourse,
        Major,
        Specialization,
    ],
})

async function initData() {
    const staff = new Staff()
    staff.id = 1
    staff.fullname = process.env.DEFAULT_STAFF_FULLNAME
    staff.email = process.env.DEFAULT_STAFF_EMAIL
    staff.role = Role.SuperAdmin
    staff.password = await bcrypt.hash(process.env.DEFAULT_STAFF_PASSWORD, 12)
    staff.status = true
    staff.save()

    const staff2 = new Staff()
    staff2.id = 2
    staff2.fullname = process.env.DEFAULT_STAFF2_FULLNAME
    staff2.email = process.env.DEFAULT_STAFF2_EMAIL
    staff2.role = Role.Lecturer
    staff2.password = await bcrypt.hash(process.env.DEFAULT_STAFF2_PASSWORD, 12)
    staff2.status = true
    staff2.save()
}

export function initDB(callback: Function = () => {}) {
    console.log(process.env.MYSQL_PASSWORD)
    AppDataSource.initialize().then(async () => {
        console.log('Database connected')
        initData()

        // const subject = new Subject()
        // subject.id = 1

        // const subjectOpen = new SubjectOpen()
        // subjectOpen.year = 2023
        // subjectOpen.term = 1
        // subjectOpen.subject = subject
        callback()
    })
}
