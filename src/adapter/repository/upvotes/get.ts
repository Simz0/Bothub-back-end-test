import { AdapterParams } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IUpvote } from "@/domain/entity/upvote"

type Params = Pick<AdapterParams, 'db'>

export type Get = (params:Prisma.UpvotesFindFirstArgs) => Promise<IUpvote | null | never>

export const buildGet = ({db}: Params): Get => {
  return async (getParams) => {
    return await db.client.upvotes.findFirst(getParams) as IUpvote | null
  }
}