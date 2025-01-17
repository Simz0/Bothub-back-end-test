import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackStatuses } from "@/domain/entity/feedbackStatuses"

type Params = Pick<AdapterParams, 'db'>

export type Delete = (data: Prisma.StatusesDeleteArgs, tx?: UnknownTx) => Promise<IFeedbackStatuses | never>

export const buildDelete = ({db}: Params): Delete => {
  return async (data, tx) => {
    return await db.getContextClient(tx).statuses.delete(data) as IFeedbackStatuses
  }
}