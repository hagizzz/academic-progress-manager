import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Classroom } from '../class/classroom.model'
import { Specialization } from '../specialization/specialization.model'

@Entity()
export class Subject extends DefaultModel {
    @Column('varchar', { nullable: true, unique: true })
    code: string

    @Column('varchar')
    name: string

    @Column('int', { nullable: true })
    credit: number

    @Column('int', { nullable: true })
    theoryPeriodAmount: number

    @Column('int', { nullable: true })
    practicePeriodAmount: number

    @Column('varchar', { nullable: true })
    subjectType: string

    @ManyToOne(() => Classroom)
    classroom: Classroom

    @ManyToOne(() => Specialization)
    specialization: Specialization
}

export interface TSubjectSheet {
    Code: string
    Name: string
    Credit: number
    TheoryPeriodAmount: number
    PracticePeriodAmount: number
}
