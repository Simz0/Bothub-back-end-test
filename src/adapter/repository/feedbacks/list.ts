import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackPost } from "@/domain/entity/feedback"

type Params = Pick<AdapterParams, 'db'>

export type List = (params: Prisma.FeedbackPostsFindManyArgs) => Promise<Array<IFeedbackPost> | never>

export const buildList = ({db}: Params): List => {
  return async (getParams) => {
    return await db.client.feedbackPosts.findMany(getParams) as Array<IFeedbackPost>
  }
}