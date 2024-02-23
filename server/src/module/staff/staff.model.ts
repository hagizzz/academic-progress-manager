import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Role } from '../role/role.model'
import { Specialization } from '../specialization/specialization.model'

@Entity()
export class Staff extends DefaultModel {
    @Column('varchar')
    fullname: string

    @Column('varchar', { unique: true })
    email: string

    @Column('varchar', { nullable: true, unique: true })
    phoneNumber: string

    @Column('varchar', { nullable: true, unique: true })
    code: string

    @Column('varchar', { nullable: true })
    gender: string

    @Column('varchar', { nullable: true })
    workplace: string

    @Column('datetime', { nullable: true })
    DOB: Date

    @Column('varchar', { nullable: true })
    citizenId: string

    @Column('varchar', { nullable: true })
    healthInsuranceNumber: string

    @Column('varchar', { nullable: true })
    taxcode: string

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

    @Column('int', { nullable: true })
    specializationId: number

    @Column('varchar', { nullable: true })
    staffType: string

    @Column('varchar', { nullable: true })
    password: string

    @Column('boolean', { default: false })
    status: boolean

    @ManyToOne(() => Role)
    role: Role

    @ManyToOne(() => Specialization)
    specialization: Specialization
}
