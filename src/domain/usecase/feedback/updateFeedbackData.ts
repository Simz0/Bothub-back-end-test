import { IFeedbackPost } from "@/domain/entity/feedback"
import { UseCaseParams } from "../types"
import { InternalError } from "@/domain/errors"

export type UpdateFeedbackPost = (data: {
  id: string,
  description: string,
  category: string,
  status: string,
}) => Promise<IFeedbackPost | never>

export const buildUpdateFeedbackPost = ({adapter}: UseCaseParams): UpdateFeedbackPost => {
  return async ({id, description, category, status}) => {
    const updateFeedbackPost = await adapter.feedbackRepository.update({
      data:{
        description,
        category,
        status,
        updated_at: new Date()
      },
      where: {
        id
      },
      select: {
        id: true,
        description: true,
        category: true,
        status: true,
        created_at: true,
        updated_at: true
      }
    })

    return updateFeedbackPost
  }
}