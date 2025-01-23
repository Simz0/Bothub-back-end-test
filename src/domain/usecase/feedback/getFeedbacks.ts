import { UseCaseParams } from "../types"
import { IFeedbackPost } from "@/domain/entity/feedback"

export type FeedbacksList = (data: {}) => Promise<Array<IFeedbackPost>>

export const buildFeedbacksList = ({adapter}: UseCaseParams): FeedbacksList => {
  return async ({skip, take}) => {
    const feedbacksList = await adapter.feedbackRepository.list({
      skip,
      take,
      select: {
        id: true,
        description: true,
        category: true,
        status: true,
        created_at: true,
        updated_at: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return feedbacksList
  }
}