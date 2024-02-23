import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity } from 'typeorm'

@Entity()
export class Role extends DefaultModel {
    @Column('varchar')
    name: string

    @Column('varchar')
    description: string
}
