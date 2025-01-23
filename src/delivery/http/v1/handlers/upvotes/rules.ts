import {check, header, } from 'express-validator'
import { authRequired, validateSchema } from '../../middlewares'

export const makeAndUpdateUpvoteRules = [
  check('title', 'Title is required').isString(),
  check('feedbacks', 'Feedbacks is not exist in your request or too small').isArray({min: 2, max: 5}),
  authRequired({}),
  validateSchema
]

export const voteRules = [
  check('index', 'Please indicate what you are voting for').exists().notEmpty(),
  check('id', 'Specify the id').exists().notEmpty().isString()
]

export const getUpvoteRules = [
  authRequired({})
]