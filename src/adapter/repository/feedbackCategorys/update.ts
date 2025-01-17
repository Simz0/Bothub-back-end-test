import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackCategorys } from "@/domain/entity/feedbackCategorys"

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.CategorysUpdateArgs, tx?: UnknownTx) => Promise<IFeedbackCategorys | never>

export const buildUpdate = ({db}: Params): Update => {
  return async (updateParams, tx) => {
    return await db.getContextClient(tx).categorys.update(updateParams) as IFeedbackCategorys
  }
}
