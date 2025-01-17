import { AdapterParams } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackStatuses } from "@/domain/entity/feedbackStatuses"

type Params = Pick<AdapterParams, 'db'>

export type Get = (params:Prisma.StatusesFindFirstArgs) => Promise<IFeedbackStatuses | null | never>

export const buildGet = ({db}: Params): Get => {
  return async (getParams) => {
    return await db.client.statuses.findFirst(getParams) as IFeedbackStatuses | null
  }
}
