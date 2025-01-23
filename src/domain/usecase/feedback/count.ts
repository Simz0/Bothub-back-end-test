import { UseCaseParams } from "../types"
import { NotFoundError } from '@/domain/errors';

export type GetFeedbackCount = ({}) => Promise<number | never>

export const buildGetFeedbackCount = ({adapter}: UseCaseParams): GetFeedbackCount => {
  return async () => {
    return await adapter.feedbackRepository.count({})
  }
}