import { UseCaseParams } from "../types";
import { MakeUpvote, buildUpvote } from "./makeUpvote";
import { buildCastVote, CastVote } from "./vote";
import { buildEditUpvote, EditUpvote } from "./editUpvote";

export type UpvotesUseCase = {
  makeUpvote: MakeUpvote,
  vote: CastVote,
  edit: EditUpvote
}

export const buildUpvoteUseCase = (params: UseCaseParams): UpvotesUseCase => {
  const makeUpvote = buildUpvote(params)
  const vote = buildCastVote(params)
  const edit = buildEditUpvote(params)

  return {
    makeUpvote,
    vote,
    edit
  }
}