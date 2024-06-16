import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Student } from '../student/student.model'
import { Course } from '../course/course.model'

@Entity()
export class EnrollCourse extends DefaultModel {
    @Column('float', { nullable: true })
    score: number

    @ManyToOne(() => Student, { eager: true })
    student: Student

    @ManyToOne(() => Course, { eager: true })
    course: Course
}

export interface EnrollCourseSheet {
    nh: string
    hk: number
    masv: number
    ho: string
    ten: string
    mamh: string
    tenmh: string
    lop: string
    diemthi: number
    diem: number
    sotc: number
}
