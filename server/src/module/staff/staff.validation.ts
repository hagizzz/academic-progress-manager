import { body } from 'express-validator'

export const createValidation = [
    body('fullname')
        .isString()
        .withMessage('Fullname must be a string')
        .trim()
        .isLength({ min: 6, max: 50 })
        .withMessage('Fullname must range from 6 to 50 characters'),

    body('email')
        .isString()
        .withMessage('Email must be a string')
        .trim()
        .isEmail()
        .withMessage('Email must have valid format'),
]
