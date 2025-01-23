import Express from "express";
import { buildEditUpvote, EditUpvote } from "./edit";
import { buildMakeUpvote, MakeUpvote } from "./make";
import { buildCastVote, CastVote } from "./vote";
import { DeliveryParams } from "@/delivery/types";
import { makeAndUpdateUpvoteRules, getUpvoteRules, voteRules } from "./rules";
import { createRouteHandler } from "../../routeHandler";
import { IHandler } from "../types";

type Params = Pick<DeliveryParams, 'upvotes'>

export type UpvotesMethods = {
  make: MakeUpvote,
  vote: CastVote,
  edit: EditUpvote
}

const buildUpvotesRoutes = (methods: UpvotesMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()

    namespace.post(
      '/make',
      makeAndUpdateUpvoteRules,
      createRouteHandler(methods.make)
    )

    namespace.post(
      '/edit',
      makeAndUpdateUpvoteRules,
      createRouteHandler(methods.edit)
    )

    namespace.post(
      '/vote',
      voteRules,
      createRouteHandler(methods.vote)
    )

    root.use('/upvotes', namespace)
  }
}

export const buildUpvotesHandler = (params: Params): IHandler => {
  const make = buildMakeUpvote(params)
  const vote = buildCastVote(params)
  const edit = buildEditUpvote(params)

  return {
    registerRoutes: buildUpvotesRoutes(
      {
        make,
        vote,
        edit
      }
    )
  }
}