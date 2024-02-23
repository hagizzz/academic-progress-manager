import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Classroom } from '../class/classroom.model'

@Entity()
export class Student extends DefaultModel {
    @Column('varchar')
    fullname: string

    @Column('varchar', { nullable: true, unique: true })
    code: string

    @Column('varchar', { nullable: true })
    gender: string

    @Column('datetime', { nullable: true })
    DOB: Date

    @Column('varchar', { nullable: true, unique: true })
    phoneNumber: string

    @Column('varchar', { unique: true })
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

    @ManyToOne(() => Classroom)
    classroom: Classroom
}
