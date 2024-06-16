import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { Permission, Role, UserJWT, hasPermission } from './auth.utils'

// export function requireRole(role: Role) {
//     const middleware = (req: Request, res: Response, next: NextFunction) => {
//         const token = req.headers['authorization'] || req.cookies.token
//         try {
//             const payload = jwt.verify(token, process.env.SECRET) as UserJWT
//             if (roleLevel(payload.role) >= roleLevel(role)) {
//                 res.locals.userData = payload
//                 return next()
//             }
//             res.status(401).send()
//         } catch (err) {
//             res.status(401).send()
//         }
//     }
//     return middleware
// }

export function requirePermission(perm: Permission) {
    const middleware = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization'] || req.cookies.token
        try {
            const payload = jwt.verify(token, process.env.SECRET) as UserJWT
            if (hasPermission(payload.role, perm)) {
                res.locals.userData = payload
                return next()
            }
            res.status(401).send()
        } catch (err) {
            res.status(401).send()
        }
    }
    return middleware
}
