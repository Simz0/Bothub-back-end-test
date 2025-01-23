import { UseCaseParams } from "../types"
import { IFeedbackPost } from "@/domain/entity/feedback"

export type GetMyFeedbacks = (data: {
  author_id: string,
  take: number,
  skip: number
}) => Promise<Array<IFeedbackPost> | never>

export const buildGetMyFeedbacks = ({adapter}: UseCaseParams): GetMyFeedbacks => {
  return async ({author_id, take, skip}) => {
    const feedbacksList = await adapter.feedbackRepository.list({
      skip,
      take,
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
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return feedbacksList
  }
}