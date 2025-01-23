import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IUpvote } from "@/domain/entity/upvote"

type Params = Pick<AdapterParams, 'db'>

export type List = (params: Prisma.UpvotesFindManyArgs) => Promise<Array<IUpvote> | never>

export const buildList = ({db}: Params): List => {
  return async (getParams) => {
    return await db.client.upvotes.findMany(getParams) as Array<IUpvote>
  }
}