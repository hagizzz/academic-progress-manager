import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity } from 'typeorm'

@Entity()
export class Permission extends DefaultModel {
    @Column('varchar')
    name: string
}
