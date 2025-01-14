import { AdapterParams, UnknownTx } from "@/adapter/types"
import {Prisma} from '@prisma/client'
import { IFeedbackPost } from "@/domain/entity/feedback"

type Params = Pick<AdapterParams, 'db'>

export type Create = (
  data: Prisma.FeedbackPostsCreateArgs, 
  tx?: UnknownTx
) => Promise<IFeedbackPost | never>

export const buildCreate = ({db}: Params): Create => {
  return async (data, tx) => {
    const result = await db.getContextClient(tx).feedbackPosts.create(
      data
    )
    
    return result as IFeedbackPost
  }
}
