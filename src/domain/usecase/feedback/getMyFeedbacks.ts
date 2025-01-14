import { UseCaseParams } from "../types"
import { IFeedbackPost } from "@/domain/entity/feedback"

export type GetMyFeedbacks = (data: {
  author_id: string
}) => Promise<Array<IFeedbackPost> | never>

export const buildGetMyFeedbacks = ({adapter}: UseCaseParams): GetMyFeedbacks => {
  return async ({author_id}) => {
    const feedbacksList = await adapter.feedbackRepository.list({
      where: {
        author_id
      },
      select: {
        id: true,
        description: true,
        author_id: true,
        created_at: true,
        status: true,
        updated_at: true
      }
    })

    return feedbacksList
  }
}