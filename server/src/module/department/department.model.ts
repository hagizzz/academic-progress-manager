import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class Department extends DefaultModel {
    @Column('varchar')
    name: string
}
