import { Categorys } from "@prisma/client"

export interface IFeedbackCategorys extends Categorys {}

/**
 * @openapi
 * components:
 *   entities:
 *      FeedbackCategorys:
 *        required:
 *          - id
 *          - type
 *        properties:
 *          id:
 *              type: string
 *          type: 
 *              type: string
 */