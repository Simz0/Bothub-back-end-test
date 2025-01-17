import { AdapterParams } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackCategorys } from "@/domain/entity/feedbackCategorys"

type Params = Pick<AdapterParams, 'db'>

export type Get = (params:Prisma.CategorysFindFirstArgs) => Promise<IFeedbackCategorys | null | never>

export const buildGet = ({db}: Params): Get => {
  return async (getParams) => {
    return await db.client.categorys.findFirst(getParams) as IFeedbackCategorys | null
  }
}
