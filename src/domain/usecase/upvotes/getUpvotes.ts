import { UseCaseParams } from "../types"
import { InternalError, NotFoundError } from "@/domain/errors"
import { IUpvote } from "@/domain/entity/upvote"

export type GetUpvotes = (params: {
  take?: number,
  skip?: number
}) => Promise<Array<IUpvote>>

export const buildGetUpvotes = ({adapter}: UseCaseParams): GetUpvotes => {
  return async ({take, skip}) => {
    const upvotes = await adapter.upvoteRepository.list({
      skip,
      take
    })

    return upvotes
  }
}
