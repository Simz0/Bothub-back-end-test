import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from '@prisma/client'
import { IFeedbackCategorys } from "@/domain/entity/feedbackCategorys"

type Params = Pick<AdapterParams, 'db'>

export type Create = (
  data: Prisma.CategorysCreateArgs,
  tx?: UnknownTx
) => Promise<IFeedbackCategorys | never>

export const buildCreate = ({db}: Params): Create => {
  return async (data, tx) => {
    const result = await db.getContextClient(tx).categorys.create(
      data
    )

    return result as IFeedbackCategorys
  }
}
