import { JwtPayload } from 'jsonwebtoken'

export enum Role {
    SuperAdmin = 'Trưởng Khoa',
    Admin = 'Phó Khoa',
    Lecturer = 'Giảng viên',
    EduAffair = 'Giáo vụ',
    Assistant = 'Trợ giảng',
    User = 'Người dùng',
}

export enum Permission {
    ReadStudent = 'Xem sinh viên',
    WriteStudent = 'Sửa sinh viên',
    AddStudent = 'Thêm sinh viên',
    DeleteStudent = 'Xóa sinh viên',

    ReadStaff = 'Xem nhân viên',
    WriteStaff = 'Sửa nhân viên',
    AddStaff = 'Thêm nhân viên',
    DeleteStaff = 'Xóa nhân viên',

    ReadScore = 'Xem điểm',

    AddSubject = 'Thêm danh sách môn học',

    AddCourses = 'Thêm danh sách lớp mở',

    BeUser = 'Đã đăng nhập',
}

export type UserJWT = JwtPayload & {
    id: number
    email: string
    role: Role
}

const permissions: { [key in Role]?: Set<Permission> } = {}

Object.values(Role).forEach((role) => (permissions[role] = new Set()))

permissions[Role.User] = new Set([Permission.BeUser])
permissions[Role.Assistant] = new Set([
    Permission.ReadScore,
    Permission.ReadStudent,
    Permission.AddSubject,
    Permission.AddCourses,
])
permissions[Role.Admin] = new Set([Permission.AddStudent, Permission.ReadStaff])
permissions[Role.SuperAdmin] = new Set([Permission.DeleteStudent])

function inheritPermission(role1: Role, role2: Role): void {
    permissions[role1].forEach((permission) => {
        permissions[role2].add(permission)
    })
}

inheritPermission(Role.User, Role.Assistant)
inheritPermission(Role.Assistant, Role.Lecturer)
inheritPermission(Role.Lecturer, Role.EduAffair)
inheritPermission(Role.EduAffair, Role.Admin)
inheritPermission(Role.Admin, Role.SuperAdmin)

// export function roleLevel(role: Role): number {
//     const roles = Object.values(Role)
//     const index = roles.indexOf(role)
//     return index == -1 ? -1 : roles.length - roles.indexOf(role)
// }

export function hasPermission(role: Role, perm: Permission) {
    return permissions[role].has(perm)
}

export function getPermissions(role: Role) {
    return Array.from(permissions[role] || [])
}
