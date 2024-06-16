import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Classroom } from '../class/classroom.model'
import { EnrollCourse } from '../enroll-course/enroll-course.model'
import { Major } from '../major/major.model'

@Entity()
export class Student extends DefaultModel {
    @Column('varchar')
    fullname: string

    @Column('varchar', { unique: true })
    code: string

    @Column('varchar', { nullable: true })
    gender: string

    @Column('datetime', { nullable: true })
    DOB: Date

    @Column('varchar', { nullable: true })
    phoneNumber: string

    @Column('varchar', { nullable: true })
    email: string

    @Column('varchar', { nullable: true })
    citizenId: string

    @Column('varchar', { nullable: true })
    healthInsuranceNumber: string

    @Column('varchar', { nullable: true })
    ethnicity: string

    @Column('varchar', { nullable: true })
    nationality: string

    @Column('varchar', { nullable: true })
    address: string

    @Column('varchar', { nullable: true })
    bankAccountNumber: string

    @Column('varchar', { nullable: true })
    bankInfo: string

    @Column('varchar', { nullable: true })
    admissionType: string

    @Column('boolean', { default: true })
    status: boolean

    @ManyToOne(() => Major)
    major: Major

    @OneToMany(() => EnrollCourse, (enrollCourse) => enrollCourse.student)
    enrollCourses: EnrollCourse[]
}

export interface TStudentSheet {
    masv: number
    ho: string
    ten: string
    mact: string
    manganh: string | number
    tennganh: string
    nh: string
    hk: number
    mask: string
    dotnam: number
    dotthang: number
    ngunghoc: number
}
