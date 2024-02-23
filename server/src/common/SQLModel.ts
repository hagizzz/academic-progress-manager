import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity()
export class DefaultModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('datetime')
    @CreateDateColumn()
    createdAt: Date

    @Column('datetime')
    @UpdateDateColumn()
    updatedAt: Date
}
