import { Statuses } from "@prisma/client"

export interface IFeedbackStatuses extends Statuses {}

/**
 * @openapi
 * components:
 *  entities:
 *    FeedbackStatuses:
 *      required:
 *        - id
 *        - type
 *       properties:
 *        id:
 *            type: string
 *        type: 
 *            type: string
 */