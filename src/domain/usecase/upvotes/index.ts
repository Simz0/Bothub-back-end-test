import { UseCaseParams } from "../types";
import { MakeUpvote, buildUpvote } from "./makeUpvote";
import { buildCastVote, CastVote } from "./vote";
import { buildEditUpvote, EditUpvote } from "./editUpvote";
import { buildGetUpvotes, GetUpvotes } from "./getUpvotes";
import { buildGetUpvoteCount, GetUpvoteCount } from "./count";
export type UpvotesUseCase = {
  makeUpvote: MakeUpvote,
  vote: CastVote,
  edit: EditUpvote,
  listGet: GetUpvotes,
  count: GetUpvoteCount
}

export const buildUpvoteUseCase = (params: UseCaseParams): UpvotesUseCase => {
  const makeUpvote = buildUpvote(params)
  const vote = buildCastVote(params)
  const edit = buildEditUpvote(params)
  const listGet = buildGetUpvotes(params)
  const count = buildGetUpvoteCount(params)

  return {
    makeUpvote,
    vote,
    edit,
    listGet,
    count
  }
}