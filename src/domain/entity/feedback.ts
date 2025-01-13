import { FeedbackPosts } from "@prisma/client"

export interface IFeedbackPost extends FeedbackPosts {}

/**
 * @openapi
 * components:
 *  entities:
 *    FeedbackPost:
 *      required:
 *        - id
 *        - created_at
 *      properties:
 *        id:
 *            type: string
 *        description:
 *            type: string
 *        category:
 *            type: string
 *        status:
 *            type: string
 *        author_id:
 *            type: string
 *        created_at:
 *            type: string
 *            format: date
 */