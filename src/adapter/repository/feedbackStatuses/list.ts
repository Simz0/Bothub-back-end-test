import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackStatuses } from "@/domain/entity/feedbackStatuses"

type Params = Pick<AdapterParams, 'db'>

export type List = (params: Prisma.StatusesFindManyArgs) => Promise<Array<IFeedbackStatuses> | never>

export const buildList = ({db}: Params): List => {
  return async (getParams) => {
    return await db.client.statuses.findMany(getParams) as Array<IFeedbackStatuses>
  }
}