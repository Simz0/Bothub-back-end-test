import { IFeedbackPost } from "@/domain/entity/feedback"
import { UseCaseParams } from "../types"
import { InternalError } from "@/domain/errors"

export type UpdateFeedbackPost = (data: {
  id: string,
  description: string,
  category: string,
  status: string,
  updated_at: Date
}) => Promise<IFeedbackPost | never>

export const buildUpdateFeedbackPost = ({adapter}: UseCaseParams): UpdateFeedbackPost => {
  return async ({id, description, category, status, updated_at}) => {
    const updateFeedbackPost = await adapter.feedbackRepository.update({
      data:{
        id,
        description,
        category,
        status,
        updated_at
      },
      where: {
        id
      }
    })

    return updateFeedbackPost
  }
}