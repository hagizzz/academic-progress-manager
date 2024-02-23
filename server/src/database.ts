import { DataSource } from 'typeorm'
import { Staff } from './module/staff/staff.model'
import { Role } from './module/role/role.model'
import { Student } from './module/student/student.model'
import { Subject } from './module/subject/subject.model'
import { Classroom } from './module/class/classroom.model'
import { Course } from './module/course/course.model'
import { Department } from './module/department/department.model'
import { EducationType } from './module/educationType/educationType.model'
import { EnrollCourse } from './module/enroll-course/enroll-course.model'
import { Major } from './module/major/major.model'
import { Permission } from './module/permission/permission.model'
import { RolePermission } from './module/role-permission/role-permission.model'
import { Specialization } from './module/specialization/specialization.model'

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
        Role,
        Student,
        Subject,
        Classroom,
        Course,
        Department,
        EducationType,
        EnrollCourse,
        Major,
        Permission,
        RolePermission,
        Specialization,
    ],
})

AppDataSource.initialize().then(() => {
    console.log('Database connected')
    const staff = new Staff()
    staff.id = 1
    staff.fullname = 'Võ Đức Cẩm Hải'
    staff.email = 'vdchai@gmail.com'
    staff.staffType = 'Phó trưởng khoa'
    staff.password = ''
    staff.status = true
    staff.save()

    // const subject = new Subject()
    // subject.id = 1

    // const subjectOpen = new SubjectOpen()
    // subjectOpen.year = 2023
    // subjectOpen.term = 1
    // subjectOpen.subject = subject
})
