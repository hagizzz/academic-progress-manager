import express from 'express'
import { body } from 'express-validator'
import { Course, TCourseSheet } from './course.model'
import { EnrollCourse } from '../enroll-course/enroll-course.model'
import { requirePermission } from '../auth/auth.middleware'
import { Permission } from '../auth/auth.utils'
import fileUpload from 'express-fileupload'
import * as XLSX from 'xlsx'
import { Like, MoreThan } from 'typeorm'

const uploadOpts = {
    useTempFiles: true,
    tempFileDir: '/tmp/',
}

export const courseRouter = express
    .Router()
    // Get all courses
    .get('/', async (req, res) => {
        const limit = parseInt(req.query.limit.toString()) || 10
        const page = parseInt(req.query.page.toString()) || 1
        const search = req.query.search
        const [courses, count] = await Course.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            where: [
                {
                    subject: {
                        name: search ? Like(`%${search}%`) : null,
                    },
                    id: MoreThan(0),
                },
                // { code: search ? Like(`%${search}%`) : null, id: MoreThan(0) },
            ],
        })

        res.json({
            courses,
            paging: {
                limit,
                page,
                total: count,
            },
        })
    })

    .get('/:id', async (req, res) => {
        const courseId = parseInt(req.params.id)
        if (!courseId) {
            return
        }

        const course = await Course.findOne({
            relations: { subject: true },
            where: { id: courseId },
        })
        const enrollCourses = await EnrollCourse.find({
            select: ['student', 'score'],
            relations: { student: true },
            where: { course: { id: courseId } },
        })

        res.json({
            ...course,
            records: enrollCourses,
        })
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

    .post('/file', requirePermission(Permission.AddCourses), fileUpload(), async (req, res) => {
        try {
            const excel = req.files.excel as fileUpload.UploadedFile

            if (
                excel.mimetype !==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                return res.status(400).json({ msg: 'File is invalid' })
            }

            const workbook = XLSX.read(excel.data, { type: 'buffer' })
            const sheetName = workbook.SheetNames[0]
            const subjects: TCourseSheet[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

            subjects.forEach(async (data) => {
                console.log({ data })
                const course = new Course()
                course.year = data.Year
                // course.term = data.Term
                // course.credit = data.Credit
                // course.theoryPeriodAmount = data.TheoryPeriodAmount
                // course.practicePeriodAmount = data.PracticePeriodAmount

                try {
                    await Course.upsert(course, ['code'])
                } catch (error) {}
            })
            res.send('Ok')
        } catch (error) {}
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Course.delete({ id: id })
        res.json(result)
    })
