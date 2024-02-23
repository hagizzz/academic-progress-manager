import { DefaultModel } from '@/common/SQLModel'
import { Column, Entity, ManyToOne } from 'typeorm'
import { Role } from '../role/role.model'
import { Permission } from '../permission/permission.model'

@Entity()
export class RolePermission extends DefaultModel {
    @ManyToOne(() => Role)
    role: Role

    @ManyToOne(() => Permission)
    permission: Permission
}
