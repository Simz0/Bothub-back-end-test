import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IUpvote } from "@/domain/entity/upvote"

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.UpvotesUpdateArgs, tx?: UnknownTx) => Promise<IUpvote | never>

export const buildUpdate = ({db}: Params): Update => {
  return async (updateParams, tx) => {
    return await db.getContextClient(tx).upvotes.update(updateParams) as IUpvote
  }
}