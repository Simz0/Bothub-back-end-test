import { UseCaseParams } from "../types"
import { InternalError, NotFoundError } from "@/domain/errors"
import { IUpvote } from "@/domain/entity/upvote"

export type CastVote = (params: {
  upvoteId: string,
  feedbackIndex: number
}) => Promise<{upvote: IUpvote}>

export const buildCastVote = ({adapter}: UseCaseParams): CastVote => {
  return async ({upvoteId, feedbackIndex}) => {
    const upvote = await adapter.upvoteRepository.get({
      where: {
        id: upvoteId
      },
      select: {
        id: true,
        feedbacks: true,
        title: true,
        votes: true
      }
    })

    if (!upvote) {
      throw new NotFoundError({message: 'Upvote data is not defined'})
    }
    if (!upvote.votes) {
      throw new InternalError()
    }

    const countOfCastVote = upvote.votes[feedbackIndex]

    if (!countOfCastVote) {
      throw new NotFoundError({message: 'Vote index is not defined'})
    }
    
    upvote.votes[feedbackIndex] += 1

    await adapter.upvoteRepository.update(
      {
        data: {
          votes: upvote.votes
        },
        where: {
          id: upvote.id
        }
      }
  )
    return {upvote}
  }
}


