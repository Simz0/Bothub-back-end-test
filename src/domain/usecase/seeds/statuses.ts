import { UseCaseParams } from "../types"
import { InternalError, NotFoundError } from "@/domain/errors"
import { IStatus } from "@/domain/entity/statuses"

export type GetStatuses = (params: {}) => Promise<Array<IStatus>>

export const buildGetStatuses = ({adapter}: UseCaseParams): GetStatuses => {
  return async ({}) => {
    const statuses = await adapter.statusesRepository.list({})

    return statuses
  }
}