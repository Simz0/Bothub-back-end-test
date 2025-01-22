import { UseCaseParams } from "../types"
import { IFeedbackPost } from "@/domain/entity/feedback"

export type FeedbacksList = (data: {}) => Promise<Array<IFeedbackPost>>

export const buildFeedbacksList = ({adapter}: UseCaseParams): FeedbacksList => {
  return async ({}) => {
    const feedbacksList = await adapter.feedbackRepository.list({
      select: {
        id: true,
        description: true,
        category: true,
        status: true,
        created_at: true,
        updated_at: true
      }
    })

    return feedbacksList
  }
}