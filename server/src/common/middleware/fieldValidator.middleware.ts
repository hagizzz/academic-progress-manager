import { validationResult, ValidationChain } from 'express-validator'
import { Response } from '../responses.ts'

import { RequestHandler } from 'express'

export function fieldValidator(...validationInputs: ValidationChain[][]): RequestHandler {
    const validations = validationInputs.flat()

    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req)
            if (result.context.errors.length) break
        }

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.json(Response(400, 'Invalid fields', errors))
    }
}
