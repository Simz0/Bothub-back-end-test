import { AdapterParams, UnknownTx } from "@/adapter/types"
import { Prisma } from "@prisma/client"
import { IFeedbackStatuses } from "@/domain/entity/feedbackStatuses"

type Params = Pick<AdapterParams, 'db'>

export type Update = (params:Prisma.StatusesUpdateArgs, tx?: UnknownTx) => Promise<IFeedbackStatuses | never>

export const buildUpdate = ({db}: Params): Update => {
  return async (updateParams, tx) => {
    return await db.getContextClient(tx).statuses.update(updateParams) as IFeedbackStatuses
  }
}
