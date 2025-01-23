import { AdapterParams, UnknownTx } from "@/adapter/types";
import { Prisma } from "@prisma/client";
import { IUpvote } from "@/domain/entity/upvote";

type Params = Pick<AdapterParams, 'db'>

export type Create = (
  data: Prisma.UpvotesCreateArgs,
  tx?: UnknownTx
) => Promise<IUpvote | never>

export const buildCreate = ({db}: Params): Create => {
  return async (data, tx) => {
    const result = await db.getContextClient(tx).upvotes.create(data)

    return result as IUpvote
  }
}