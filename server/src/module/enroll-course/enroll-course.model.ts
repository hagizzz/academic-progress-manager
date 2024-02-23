import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Student } from '../student/student.model'
import { Course } from '../course/course.model'

@Entity()
export class EnrollCourse extends DefaultModel {
    @Column('float')
    score: number

    @Column('varchar')
    note: string

    @ManyToOne(() => Student)
    student: Student

    @ManyToOne(() => Course)
    course: Course
}
