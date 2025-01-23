import { UseCaseParams } from "../types"
import { NotFoundError } from '@/domain/errors';

export type GetUpvoteCount = ({}) => Promise<number | never>

export const buildGetUpvoteCount = ({adapter}: UseCaseParams): GetUpvoteCount => {
  return async () => {
    return await adapter.upvoteRepository.count({})
  }
}