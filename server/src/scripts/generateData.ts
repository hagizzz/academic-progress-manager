import 'dotenv/config'
import 'reflect-metadata'
import { faker } from '@faker-js/faker'
import { AppDataSource as db, initDB } from '../database'
import { Subject } from '../module/subject/subject.model'
import { Student } from '../module/student/student.model'
import { Classroom } from '../module/class/classroom.model'
import { Course } from '../module/course/course.model'
import { EnrollCourse } from '../module/enroll-course/enroll-course.model'
import { choose, constraint, getKeys, randInt, randRange, randomSkewNormal } from './helpers'

const admissionTypes = ['THPTQG', 'ĐGNL']

function randOnPercentage(percentages: { [key: number]: number }) {
    const r = Math.random()
    const options = getKeys(percentages)

    let sum = 0
    for (const option of options) {
        sum += percentages[option]
        if (r <= sum) {
            return option
        }
    }
    return options[options.length - 1]
}

function generateStudent() {
    const genderRand = Math.random() < 0.5 ? 1 : 0

    const student = new Student()
    student.gender = genderRand ? 'Nữ' : 'Nam'
    student.fullname = faker.person.fullName({ sex: genderRand ? 'female' : 'male' })
    student.code = `2011${randInt(0, 9999).toString().padStart(4, '0')}`
    student.phoneNumber = faker.phone.number('0#########')
    student.email = `${student.code}@student.hcmus.edu.vn`
    student.citizenId = randInt(100000000000, 999999999999).toString().padStart(12, '0')
    student.address = faker.location.city()
    student.admissionType = choose(admissionTypes)
    student.status = true
    student.nationality = faker.location.country()
    student.DOB = faker.date.birthdate({ min: 18, max: 23 })
    student.classroom = new Classroom()
    student.classroom.id = randOnPercentage({
        2: 0.43,
        3: 0.41,
        7: 0.16,
    })

    return student
}

async function generateStudents(amount: number) {
    const students = Array(amount)
        .fill(0)
        .map(() => generateStudent())
    students.forEach((student) => {
        try {
            student.save()
        } catch (err) {
            console.log('duplicate')
        }
    })
}

async function generateScores() {
    const courses = await Course.find()

    courses.forEach(async (course) => {
        const mu = randRange(6, 7.8)
        const sigma = randRange(1.5, 2)
        const alpha = randRange(0.5, 2)

        const students = await db
            .getRepository(Student)
            .createQueryBuilder('student')
            .select()
            .orderBy('RAND()')
            .limit(randInt(140, 180))
            // .limit(5)
            .getMany()

        const enrolls = students.map((student) => {
            const enroll = new EnrollCourse()
            enroll.student = student
            enroll.course = course
            enroll.score =
                Math.round(constraint(randomSkewNormal(mu, sigma, alpha), 0, 10) * 100) / 100

            // enroll.save()
            return enroll
        })

        console.log({ id: course.id, mu, sigma, alpha })
        // console.log(enrolls.map((enroll) => [enroll.student.fullname, enroll.score]))
        const n = enrolls.length
        const mean = enrolls.reduce((pre, curr) => pre + curr.score, 0) / n
        const stdDeviation = Math.sqrt(
            enrolls.reduce((pre, curr) => pre + Math.pow(curr.score - mean, 2) / (n - 1), 0)
        )

        console.log({
            n,
            mean,
            stdDeviation,
        })
        console.log()
    })
}

initDB(async () => {
    generateScores()
})
