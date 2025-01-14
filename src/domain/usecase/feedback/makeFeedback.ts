import { IFeedbackPost } from "@/domain/entity/feedback"
import { UseCaseParams } from "../types"
import { InternalError } from "@/domain/errors"

export type MakeFeedbackPost = (params: {
  description: string,
  category: string,
  author_id: string
}) => Promise<{
    feedbackPost: IFeedbackPost
}>

export const buildFeedbackPost = ({adapter}: UseCaseParams): MakeFeedbackPost => {
  return async ({description, category, author_id}) => {
    const feedbackPost = await adapter.feedbackRepository.create({
      data: {
        description,
        category,
        author_id
      },
      select: {
        id: true,
        description: true,
        category: true,
        status: true,
        created_at: true,        
      }
    })

    if (!feedbackPost) {
      throw new InternalError
    }

    return { feedbackPost }
  }
}