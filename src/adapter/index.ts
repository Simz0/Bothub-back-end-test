import { buildExampleGateway, ExampleGateway } from './gateway/example';
import { buildUserRepository, UserRepository } from './repository/user';
import { buildFeedbackRepository, FeedbackRepository } from './repository/feedbacks';
import { AdapterParams } from './types';

export type Adapter = {
  userRepository: UserRepository;
  feedbackRepository: FeedbackRepository;
  exampleGateway: ExampleGateway;
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const feedbackRepository = buildFeedbackRepository(params)
  const exampleGateway = buildExampleGateway(params);

  return {
    userRepository,
    feedbackRepository,
    exampleGateway
  }
}
