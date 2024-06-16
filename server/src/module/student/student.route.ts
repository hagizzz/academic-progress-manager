import express from 'express'
import { body } from 'express-validator'
import { Student, TStudentSheet } from './student.model'
import fileUpload from 'express-fileupload'
import * as XLSX from 'xlsx'
import { requirePermission } from '../auth/auth.middleware'
import { Permission } from '../auth/auth.utils'
import { Major } from '../major/major.model'
import { Like, MoreThan } from 'typeorm'

const uploadOpts = {
    useTempFiles: true,
    tempFileDir: '/tmp/',
}

export const studentRouter = express
    .Router()
    // Get all students
    .get('/', requirePermission(Permission.ReadStudent), async (req, res) => {
        const limit = parseInt(req.query.limit.toString()) || 10
        const page = parseInt(req.query.page.toString()) || 1
        const search = req.query.search
        const [students, count] = await Student.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            where: [
                { fullname: search ? Like(`%${search}%`) : null, id: MoreThan(0) },
                { code: search ? Like(`%${search}%`) : null, id: MoreThan(0) },
            ],
        })

        res.json({
            students,
            paging: {
                limit,
                page,
                total: count,
            },
        })
    })

    .get('/:id', requirePermission(Permission.ReadStudent), async (req, res) => {
        const id = parseInt(req.params.id)
        const student = await Student.findOneBy({ id: id })

        res.json(student)
    })

    .post('/', requirePermission(Permission.AddStudent), async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const student = new Student()
        student.fullname = data.fullname
        student.email = data.email
        await student.save()

        res.json(student)
    })

    .post('/file', requirePermission(Permission.AddStudent), fileUpload(), async (req, res) => {
        try {
            console.log('file')
            const excel = req.files.excel as fileUpload.UploadedFile
            // if (
            //     excel.mimetype !==
            //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            // ) {
            //     return res.status(400).json({ msg: 'File is invalid' })
            // }

            const workbook = XLSX.read(excel.data, { type: 'buffer' })
            const sheetName = workbook.SheetNames[0]
            const studentsData: TStudentSheet[] = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName]
            )

            const majorsData = studentsData
                .map((student) => ({
                    tennganh: student.tennganh,
                    manganh: student.manganh,
                }))
                .reduce((acc, majorData) => {
                    if (!acc.find((c) => c.manganh == majorData.manganh)) {
                        return [...acc, majorData]
                    }
                    return acc
                }, [])

            const majors = await Promise.all(
                majorsData.map(async (majorData) => {
                    let major = await Major.findOneBy({ code: majorData.manganh.toString() })
                    if (!major) {
                        major = new Major()
                        major.code = majorData.manganh.toString()
                        major.name = majorData.tennganh
                        return major.save()
                    }
                    return new Promise<Major>((resolve) => {
                        resolve(major)
                    })
                })
            )

            const students = await Promise.all(
                studentsData.map(async (studentData) => {
                    let student = await Student.findOneBy({ code: studentData.masv.toString() })
                    if (!student) {
                        const student = new Student()
                        student.code = studentData.masv.toString()
                        student.fullname = `${studentData.ho} ${studentData.ten}`
                        student.major = majors.find(
                            (major) => major.code == studentData.manganh.toString()
                        )
                        return student.save()
                    }
                    return new Promise<Student>((resolve) => {
                        resolve(student)
                    })
                })
            )

            res.send('ok')
        } catch (error) {
            console.log(error)
        }
    })

    .delete('/:id', requirePermission(Permission.DeleteStudent), async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Student.update({ id }, { status: false })
        res.json(result)
    })
