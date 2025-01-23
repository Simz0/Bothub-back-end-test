import { UseCaseParams } from "../types"
import { InternalError, NotFoundError } from "@/domain/errors"
import { IUpvote } from "@/domain/entity/upvote"

export type MakeUpvote = (params: {
  feedbacks: string[],
  title?: string
}) => Promise<{
  upvote: IUpvote
}>

export const buildUpvote = ({adapter}: UseCaseParams): MakeUpvote => {
  return async ({feedbacks, title}) => {
    const feedbackDump = await adapter.feedbackRepository.list({})
    let vote = []
    let realFeedbacksCount = 0

    for (const feedbackPost of feedbackDump) {
      if (feedbacks.includes(feedbackPost.id)) {
        realFeedbacksCount += 1
      } 
    }

    if (realFeedbacksCount !== feedbacks.length) {
      throw new Error('Feedback id is not defined')
    }

    for (let number=0; number<realFeedbacksCount; number++) { 
      vote.push(0)
    }
    const upvote = await adapter.upvoteRepository.create({
      data: {
        feedbacks: feedbacks,
        title,
        votes: vote
      },
      select: {
        id: true,
        feedbacks: true,
        votes: true
      }
    })

    return { upvote }
  }
}
