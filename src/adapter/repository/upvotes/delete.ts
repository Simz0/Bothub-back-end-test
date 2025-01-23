import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IUpvote } from "@/domain/entity/upvote"

type Params = Pick<AdapterParams, 'db'>

export type Delete = (data: Prisma.UpvotesDeleteArgs, tx?: UnknownTx) => Promise<IUpvote | never>

export const buildDelete = ({db}: Params): Delete => {
  return async (data, tx) => {
    return await db.getContextClient(tx).upvotes.delete(data) as IUpvote
  }
}