import { AuthUseCase, buildAuthUseCase } from './auth';
import { FeedbackUseCase, buildFeedbackPostsUseCase } from './feedback';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { buildUpvoteUseCase, UpvotesUseCase } from './upvotes';
import { UseCaseParams } from './types';
import { buildSeedsUseCase, SeedsUseCase } from './seeds';

export type UseCase = {
  auth: AuthUseCase,
  feedbacks: FeedbackUseCase,
  example: ExampleUseCase,
  upvotes: UpvotesUseCase,
  seeds: SeedsUseCase
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const feedbacks = buildFeedbackPostsUseCase(params) 
  const example = buildExampleUseCase(params)
  const upvotes = buildUpvoteUseCase(params)
  const seeds = buildSeedsUseCase(params)

  return {
    auth,
    feedbacks,
    example,
    upvotes,
    seeds
  }
}
