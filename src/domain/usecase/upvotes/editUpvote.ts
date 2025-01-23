import { UseCaseParams } from "../types"
import { InternalError, NotFoundError } from "@/domain/errors"
import { IUpvote } from "@/domain/entity/upvote"

export type EditUpvote = (params: {
  id: string,
  title: string,
  votes: number[],
  feedbacks: string[]
}) => Promise<{upvote: IUpvote}>

export const buildEditUpvote = ({adapter}: UseCaseParams): EditUpvote => {
  return async ({id, title, votes, feedbacks}) => {
    const upvote = await adapter.upvoteRepository.update({
      where: {
        id
      },
      data: {
        title,
        votes,
        feedbacks
      },
      select: {
        id: true,
        feedbacks: true,
        votes: true,
        title: true
      }
    })

    return { upvote } 
  }
}