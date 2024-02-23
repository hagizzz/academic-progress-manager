import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Major } from '../major/major.model'

@Entity()
export class Specialization extends DefaultModel {
    @Column('varchar')
    name: string

    @ManyToOne(() => Major)
    major: Major
}
