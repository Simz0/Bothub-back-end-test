import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildUserRepository, UserRepository } from './repository/user';
import { buildFeedbackRepository, FeedbackRepository } from './repository/feedbacks';
import { buildFeedbackCategorysRepository, FeedbackCategorysRepository } from './repository/feedbackCategorys';
import { buildFeedbackStatusesRepository, FeedbackStatusesRepository } from './repository/feedbackStatuses';
import { buildUpvotesRepository, UpvotesRepository } from './repository/upvotes';
import { AdapterParams } from './types';

export type Adapter = {
  userRepository: UserRepository;
  feedbackRepository: FeedbackRepository;
  statusesRepository: FeedbackStatusesRepository;
  categoryRepository: FeedbackCategorysRepository;
  upvoteRepository: UpvotesRepository
  exampleGateway: ExampleGateway;
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const feedbackRepository = buildFeedbackRepository(params)
  const exampleGateway = buildExampleGateway(params);
  const statusesRepository = buildFeedbackStatusesRepository(params)
  const categoryRepository = buildFeedbackCategorysRepository(params)
  const upvoteRepository = buildUpvotesRepository(params)

  return {
    userRepository,
    feedbackRepository,
    statusesRepository,
    categoryRepository,
    exampleGateway,
    upvoteRepository
  }
}
