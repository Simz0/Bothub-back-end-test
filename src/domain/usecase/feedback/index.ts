import { UseCaseParams } from "../types"
import { buildGetMyFeedbacks, GetMyFeedbacks } from "./getMyFeedbacks"
import { buildFeedbackPost, MakeFeedbackPost } from "./makeFeedback"
import { buildUpdateFeedbackPost, UpdateFeedbackPost } from "./updateFeedbackData"

export type FeedbackUseCase = {
  makeFeedbackPost: MakeFeedbackPost,
  getMyFeedbacks: GetMyFeedbacks,
  updateFeedbackPost: UpdateFeedbackPost
}

export const buildFeedbackPostsUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const makeFeedbackPost = buildFeedbackPost(params)
  const updateFeedbackPost = buildUpdateFeedbackPost(params)
  const getMyFeedbacks = buildGetMyFeedbacks(params)

  return {
    makeFeedbackPost,
    updateFeedbackPost,
    getMyFeedbacks
  }
}