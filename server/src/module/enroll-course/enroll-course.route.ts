import express from 'express'
import { body } from 'express-validator'
import { EnrollCourse, EnrollCourseSheet } from './enroll-course.model'
import fileUpload from 'express-fileupload'
import * as XLSX from 'xlsx'
import { Course } from '../course/course.model'
import { Subject } from '../subject/subject.model'
import { Classroom } from '../class/classroom.model'
import { Student } from '../student/student.model'

function parseNum(s: any) {
    return parseInt((s || '') as string) || null
}

export const enrollCourseRouter = express
    .Router()
    // Get all enroll-course
    .get('/', async (req, res) => {
        let enrollCourse: EnrollCourse[] = []
        let courseId = parseNum(req.query.courseId)
        let subjectId = parseNum(req.query.subjectId)
        let term = parseNum(req.query.term)
        let year = parseNum(req.query.year)
        let limit = parseNum(req.query.limit) || 20
        let page = parseNum(req.query.page) || 1

        enrollCourse = await EnrollCourse.find({
            where: {
                course: {
                    id: courseId,
                    subject: {
                        id: subjectId,
                    },
                    term,
                    year,
                },
            },
            relations: {
                course: {
                    classroom: true,
                },
            },
            take: limit,
        })
        res.json(enrollCourse)
    })

    .post('/file', fileUpload(), async (req, res) => {
        try {
            console.log('file')
            const excel = req.files.excel as fileUpload.UploadedFile

            const workbook = XLSX.read(excel.data, { type: 'buffer' })
            const sheetName = workbook.SheetNames[0]
            const enrollsData: EnrollCourseSheet[] = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName]
            )

            const classesData = enrollsData.reduce<EnrollCourseSheet[]>((acc, data) => {
                if (!acc.find((c) => c.lop == data.lop)) {
                    return [...acc, data]
                }
                return acc
            }, [])

            const subjectsData = enrollsData.reduce<EnrollCourseSheet[]>((acc, data) => {
                if (!acc.find((c) => c.mamh == data.mamh)) {
                    return [...acc, data]
                }
                return acc
            }, [])

            const coursesData = enrollsData.reduce<EnrollCourseSheet[]>((acc, data) => {
                if (!acc.find((c) => c.mamh == data.mamh && c.lop == data.lop)) {
                    return [...acc, data]
                }
                return acc
            }, [])

            const classrooms = await Promise.all(
                classesData.map(async (data) => {
                    let classroom = await Classroom.findOneBy({ code: data.lop })
                    if (!classroom) {
                        classroom = new Classroom()
                        classroom.code = data.lop
                        await classroom.save()
                    }
                    return classroom
                })
            )
            console.log('Inserted classrooms')

            const subjects = await Promise.all(
                subjectsData.map(async (data) => {
                    let subject = await Subject.findOneBy({ code: data.mamh })
                    if (!subject) {
                        subject = new Subject()
                        subject.code = data.mamh
                        subject.name = data.tenmh
                        subject.credit = data.sotc
                        await subject.save()
                    }
                    return subject
                })
            )

            const courses = await Promise.all(
                coursesData.map(async (data) => {
                    let subject = subjects.find((s) => s.code == data.mamh)
                    let classroom = classrooms.find((c) => c.code == data.lop)

                    const [fromYear, toYear] = data.nh.split('-')
                    const year = parseInt(fromYear)

                    let course = await Course.findOneBy({
                        classroom: { id: classroom.id },
                        subject: { id: subject.id },
                    })
                    if (!course) {
                        course = new Course()
                        course.classroom = classroom
                        course.subject = subject
                        course.year = year
                        course.term = data.hk
                        await course.save()
                    }

                    return course
                })
            )

            // const enrolls = await Promise.all(
            enrollsData.map(async (data) => {
                const course = courses.find(
                    (c) => c.classroom.code == data.lop && c.subject.code == data.mamh
                )
                const student = await Student.findOneBy({ code: data.masv.toString() })

                let enroll = await EnrollCourse.findOneBy({
                    course: { id: course.id },
                    student: { id: student.id },
                })
                if (!enroll) {
                    enroll = new EnrollCourse()
                    enroll.course = course
                    enroll.student = student
                    if (typeof enroll.score == 'number') {
                        enroll.score = data.diemthi
                    } else {
                        enroll.score = null
                    }
                    await enroll.save()
                }
                return enroll
            })
            // )

            // console.log(enrollsData[0])
            // console.log(enrolls[0])

            res.send('ok')
        } catch (error) {
            console.log(error)
        }
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const enrollCourse = await EnrollCourse.findOneBy({ id: id })

        res.json(enrollCourse)
    })

    .post('/', async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        // const enrollCourse = new EnrollCourse()
        // enrollCourse.score = data.name
        // enrollCourse.note = data.code
        // await enrollCourse.save()

        // res.json(enrollCourse)
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await EnrollCourse.delete({ id: id })
        res.json(result)
    })
