import Express from "express";
import { buildEditUpvote, EditUpvote } from "./edit";
import { buildMakeUpvote, MakeUpvote } from "./make";
import { buildCastVote, CastVote } from "./vote";
import { buildGetUpvotes, GetUpvotes } from "./get";
import { DeliveryParams } from "@/delivery/types";
import { makeAndUpdateUpvoteRules, getUpvoteRules, voteRules } from "./rules";
import { createRouteHandler } from "../../routeHandler";
import { IHandler } from "../types";

type Params = Pick<DeliveryParams, 'upvotes'>

export type UpvotesMethods = {
  make: MakeUpvote,
  vote: CastVote,
  edit: EditUpvote,
  get: GetUpvotes
}

const buildUpvotesRoutes = (methods: UpvotesMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()

    /**
     * @openapi
     * /upvotes:
     *  get:
     *    tags: [Upvotes]
     *    security:
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    parameters:
     *      - name: page
     *        in: query
     *        description: Страница получаемого запроса (приходит по 10 штук на страницу)
     *    responses:
     *      200:
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/entities/Upvote'
     */
    namespace.get(
      '/',
      getUpvoteRules,
      createRouteHandler(methods.get)
    )
    
     /**
     * @openapi
     * /upvotes/make:
     *  post:
     *    tags: [Upvotes]
     *    security: 
     *      - bearerAuth: []
     *    produces:
     *      application/json
     *    requestBody:
     *      in: Body
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/rules/upvote'
     *    responses:
     *      200:
     *        description: Make upvote object
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                upvote:
     *                  $ref: '#/components/entities/Upvote'
     */
    namespace.post(
      '/make',
      makeAndUpdateUpvoteRules,
      createRouteHandler(methods.make)
    )

    /**
     * @openapi
     * /upvotes/edit:
     *  post:
     *    tags: [Upvotes]
     *    security: 
     *      - bearerAuth: []
     *    produces:
     *      application/json
     *    requestBody:
     *      in: Body
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/rules/upvote'
     *    responses:
     *      200:
     *        description: Edit upvote object
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                upvote:
     *                  $ref: '#/components/entities/Upvote'
     */
    namespace.post(
      '/edit',
      makeAndUpdateUpvoteRules,
      createRouteHandler(methods.edit)
    )

     /**
     * @openapi
     * /upvotes/vote:
     *  post:
     *    tags: [Upvotes]
     *    security: 
     *      - bearerAuth: []
     *    produces:
     *      application/json
     *    requestBody:
     *      in: Body
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/rules/vote'
     *    responses:
     *      200:
     *        description: Make vote for feedback
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                upvote:
     *                  $ref: '#/components/entities/Upvote'
     */   
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
  const get = buildGetUpvotes(params)

  return {
    registerRoutes: buildUpvotesRoutes(
      {
        make,
        vote,
        edit,
        get
      }
    )
  }
}