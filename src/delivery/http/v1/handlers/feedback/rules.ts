import { check, header } from 'express-validator'
import { authRequired, validateSchema } from '../../middlewares'

const categoryList: string[] | string = [
  //Список сидов категорий
  'Bug',
  'Integrations',
  'UI',
  'Performance',
  'New Feature'
]

/**
 * @openapi
 * components:
 *  rules:
 *    feedback:
 *      required:
 *        - description
 *        - category
 *      properties:
 *        description:
 *          type: string
 *        category:
 *          type: string         
 */
export const feedbackCheckRules = [
  check('description', 'The description is not specified').exists().notEmpty().isString(),
  check('category', 'Custom categories are not supported').exists().notEmpty().isString().isIn(categoryList),
  authRequired({}),
  validateSchema
]

export const feedbackGetRules = [
  authRequired({}),
  validateSchema
]