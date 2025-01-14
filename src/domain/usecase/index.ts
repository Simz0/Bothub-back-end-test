import { AuthUseCase, buildAuthUseCase } from './auth';
import { FeedbackUseCase, buildFeedbackPostsUseCase } from './feedback';
import { buildExampleUseCase, ExampleUseCase } from './example'
import { UseCaseParams } from './types';

export type UseCase = {
  auth: AuthUseCase;
  feedbacks: FeedbackUseCase,
  example: ExampleUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const feedbacks = buildFeedbackPostsUseCase(params) 
  const example = buildExampleUseCase(params);

  return {
    auth,
    feedbacks,
    example
  }
}
