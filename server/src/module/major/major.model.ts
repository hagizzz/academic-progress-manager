import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Department } from '../department/department.model'

@Entity()
export class Major extends DefaultModel {
    @Column('varchar', { nullable: true, unique: true })
    code: string

    @Column('varchar')
    name: string

    @ManyToOne(() => Department)
    department: Department
}
