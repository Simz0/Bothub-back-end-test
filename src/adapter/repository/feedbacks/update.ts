import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackPost } from "@/domain/entity/feedback"

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.FeedbackPostsUpdateArgs, tx?: UnknownTx) => Promise<IFeedbackPost | never>

export const buildUpdate = ({db}: Params): Update => {
  return async (getParams, tx) => {
    return await db.getContextClient(tx).feedbackPosts.update(getParams) as IFeedbackPost
  }
}