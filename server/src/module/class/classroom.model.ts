import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Major } from '../major/major.model'
import { EducationType } from '../educationType/educationType.model'

@Entity()
export class Classroom extends DefaultModel {
    @Column('varchar', { nullable: true, unique: true })
    code: string

    @ManyToOne(() => Major)
    major: Major

    @ManyToOne(() => EducationType)
    educationType: EducationType
}
