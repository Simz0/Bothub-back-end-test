import { UseCaseParams } from "../types"
import { buildGetMyFeedbacks, GetMyFeedbacks } from "./getMyFeedbacks"
import { buildFeedbackPost, MakeFeedbackPost } from "./makeFeedback"
import { buildUpdateFeedbackPost, UpdateFeedbackPost } from "./updateFeedbackData"
import { FeedbacksList, buildFeedbacksList } from "./getFeedbacks"
import { GetFeedback, buildGetFeedback } from "./getFeedback"
export type FeedbackUseCase = {
  makeFeedbackPost: MakeFeedbackPost,
  getFeedback: GetFeedback,
  getFeedbacksList: FeedbacksList,
  getMyFeedbacks: GetMyFeedbacks,
  updateFeedbackPost: UpdateFeedbackPost
}

export const buildFeedbackPostsUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const makeFeedbackPost = buildFeedbackPost(params)
  const updateFeedbackPost = buildUpdateFeedbackPost(params)
  const getMyFeedbacks = buildGetMyFeedbacks(params)
  const getFeedbacksList = buildFeedbacksList(params)
  const getFeedback = buildGetFeedback(params)
  return {
    makeFeedbackPost,
    updateFeedbackPost,
    getMyFeedbacks,
    getFeedbacksList,
    getFeedback
  }
}