import { AdapterParams } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackPost } from "@/domain/entity/feedback"

type Params = Pick<AdapterParams, 'db'>

export type Get = (params:Prisma.FeedbackPostsFindFirstArgs) => Promise<IFeedbackPost | null | never>

export const buildGet = ({db}: Params): Get => {
  return async (getParams) => {
    return await db.client.feedbackPosts.findFirst(getParams) as IFeedbackPost | null
  }
}