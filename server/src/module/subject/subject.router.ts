import express from 'express'
import { body } from 'express-validator'
import { Subject, TSubjectSheet } from './subject.model'
import { requirePermission } from '../auth/auth.middleware'
import { Permission } from '../auth/auth.utils'
import fileUpload from 'express-fileupload'
import * as XLSX from 'xlsx'
import { Like } from 'typeorm'

export const subjectRouter = express
    .Router()
    // Get all subjects
    .get('/', async (req, res) => {
        const limit = parseInt(req.query.limit.toString()) || 10
        const page = parseInt(req.query.page.toString()) || 1
        const search = req.query.search

        const [subjects, count] = await Subject.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            where: {
                name: search ? Like(`%${search}%`) : null,
            },
        })

        res.json({
            subjects,
            paging: {
                limit,
                page,
                total: count,
            },
        })
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const subject = await Subject.findOneBy({ id: id })

        res.json(subject)
    })

    .post('/', async (req, res) => {
        const data = req.body
        // data.password = await bcrypt.hash(data.password, 10)

        const subject = new Subject()
        subject.name = data.name
        subject.code = data.code
        await subject.save()

        res.json(subject)
    })

    .post('/file', requirePermission(Permission.AddSubject), fileUpload(), async (req, res) => {
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
            const subjects: TSubjectSheet[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])

            subjects.forEach(async (data) => {
                console.log({ data })
                const subject = new Subject()
                subject.code = data.Code
                subject.name = data.Name
                subject.credit = data.Credit
                subject.theoryPeriodAmount = data.TheoryPeriodAmount
                subject.practicePeriodAmount = data.PracticePeriodAmount

                try {
                    await Subject.upsert(subject, ['code'])
                } catch (error) {}
            })
            res.send('Ok')
        } catch (error) {}
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id)
        const result = await Subject.delete({ id: id })
        res.json(result)
    })
