import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackPost } from "@/domain/entity/feedback"

type Params = Pick<AdapterParams, 'db'>

export type Delete = (data: Prisma.FeedbackPostsDeleteArgs, tx?: UnknownTx) => Promise<IFeedbackPost | never>

export const buildDelete = ({db}: Params): Delete => {
  return async (data, tx) => {
    return await db.getContextClient(tx).feedbackPosts.delete(data) as IFeedbackPost
  }
}