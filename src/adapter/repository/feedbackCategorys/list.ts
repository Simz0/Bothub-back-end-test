import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackCategorys } from "@/domain/entity/feedbackCategorys"

type Params = Pick<AdapterParams, 'db'>

export type List = (params: Prisma.CategorysFindManyArgs) => Promise<Array<IFeedbackCategorys> | never>

export const buildList = ({db}: Params): List => {
  return async (getParams) => {
    return await db.client.categorys.findMany(getParams) as Array<IFeedbackCategorys>
  }
}