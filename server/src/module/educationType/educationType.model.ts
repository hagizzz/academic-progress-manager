import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity } from 'typeorm'

@Entity()
export class EducationType extends DefaultModel {
    @Column('varchar')
    name: string
}
