import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackCategorys } from "@/domain/entity/feedbackCategorys"

type Params = Pick<AdapterParams, 'db'>

export type Delete = (data: Prisma.CategorysDeleteArgs, tx?: UnknownTx) => Promise<IFeedbackCategorys | never>

export const buildDelete = ({db}: Params): Delete => {
  return async (data, tx) => {
    return await db.getContextClient(tx).categorys.delete(data) as IFeedbackCategorys
  }
}