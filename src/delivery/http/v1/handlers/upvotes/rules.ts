import {check, header, } from 'express-validator'
import { authRequired, validateSchema } from '../../middlewares'

/**
 * @openapi
 * components:
 *  rules:
 *    upvote:
 *      required:
 *        - title
 *        - feedbacks
 *      properties:
 *        title:
 *          type: string
 *        feedbacks:
 *          type: array
 *          items:
 *            type: string
 *        votes: 
 *            type: array
 *            items: 
 *              type: number
 */
export const makeAndUpdateUpvoteRules = [
  check('title', 'Title is required').isString(),
  check('feedbacks', 'Feedbacks is not exist in your request or too small').isArray({min: 2, max: 5}),
  authRequired({}),
  validateSchema
]

/**
 * @openapi
 * components: 
 *  rules:
 *    vote:
 *      required:
 *        - index
 *        - id
 *      properties:
 *        index:
 *          type: number
 *        id:
 *          type: string
 */
export const voteRules = [
  check('index', 'Please indicate what you are voting for').notEmpty(),
  check('id', 'Specify the id').isString()
]

export const getUpvoteRules = [
  authRequired({})
]