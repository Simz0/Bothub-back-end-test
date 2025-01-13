import { AdapterParams } from "@/adapter/types"
import { Prisma } from "@prisma/client"

type Params = Pick<AdapterParams, 'db'>

export type Count = (params: Prisma.FeedbackPostsCountArgs) => Promise<number | never>

export const buildCount = ({db}: Params): Count => {
  return async (args) => {
    return await db.client.feedbackPosts.count(args)
  }
}