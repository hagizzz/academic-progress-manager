import { body } from 'express-validator'

export const loginValidation = [
    body('email')
        .isString()
        .withMessage('Email must be a string')
        .trim()
        .isEmail()
        .withMessage('Email must have valid format'),
    body('password')
        .trim()
        .isLength({ min: 6, max: 50 })
        .withMessage('Password must range from 6 to 15 characters'),
]
