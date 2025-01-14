import { UseCaseParams } from "../types"
import { IFeedbackPost } from "@/domain/entity/feedback"
import { NotFoundError } from '@/domain/errors';

export type GetFeedback = (data: {id: string}) => Promise<IFeedbackPost | never>

export const buildGetFeedback = ({adapter}: UseCaseParams): GetFeedback => {
  return async ({id}) => {
    const feedback = await adapter.feedbackRepository.get({
      where: {
        id
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

    if (!feedback) {
      throw new NotFoundError({
        code: "FEEDBACK DATA NOT FOUND"
      }) 
    }

    return feedback
  }
}