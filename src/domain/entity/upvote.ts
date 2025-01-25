import {Upvotes} from "@prisma/client"

export interface IUpvote extends Upvotes {}

/**
 * @openapi
 * components:
 *  entities:
 *    Upvote:
 *      required:
 *        - id
 *        - feedbacks
 *        - votes
 *        - created_at
 *      properties:
 *        id:
 *          type: string
 *        feedbacks:
 *          type: array
 *          items: 
 *            type: string
 *        votes:
 *          type: array
 *          items: 
 *            type: number
 *        title:
 *          type: string
 *        created_at:
 *          type: string
 *          format: date
 *        updated_at:
 *            type: string
 *            format: date
 */