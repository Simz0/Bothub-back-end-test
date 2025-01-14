import { UseCaseParams } from "../types"
import { IFeedbackPost } from "@/domain/entity/feedback"

export type FeedbacksList = (data: {}) => Promise<Array<IFeedbackPost>>

export const buildFeedbackPost = ({adapter}: UseCaseParams): FeedbacksList => {
  return async ({}) => {
    const feedbacksList = await adapter.feedbackRepository.list({})

    return feedbacksList
  }
}