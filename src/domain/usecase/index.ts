import { AuthUseCase, buildAuthUseCase } from './auth';
import { FeedbackUseCase, buildFeedbackPostsUseCase } from './feedback';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { buildUpvoteUseCase, UpvotesUseCase } from './upvotes';
import { UseCaseParams } from './types';

export type UseCase = {
  auth: AuthUseCase;
  feedbacks: FeedbackUseCase,
  example: ExampleUseCase;
  upvotes: UpvotesUseCase
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const feedbacks = buildFeedbackPostsUseCase(params) 
  const example = buildExampleUseCase(params);
  const upvotes = buildUpvoteUseCase(params)
  return {
    auth,
    feedbacks,
    example,
    upvotes
  }
}
