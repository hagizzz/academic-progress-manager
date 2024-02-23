import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Subject } from '../subject/subject.model'
import { Staff } from '../staff/staff.model'
import { Classroom } from '../class/classroom.model'

@Entity()
export class Course extends DefaultModel {
    @Column('int', { nullable: true })
    year: number

    @Column('int', { nullable: true })
    term: number

    @ManyToOne(() => Subject)
    subject: Subject

    @ManyToOne(() => Staff)
    lecturer: Staff

    @ManyToOne(() => Classroom)
    classroom: Classroom
}
