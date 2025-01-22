import Express from 'express'
import { buildMakeFeedback, MakeFeedback } from './makeFeedback'
import { buildGetFeedback, GetFeedback } from './getOneFeedback'
import { buildGetFeedbacksList, GetFeedbacksList } from './getFeedbacks'
import { buildUpdateFeedback, UpdateFeedback } from './updateFeedback'
import { buildMyFeedbacks, MyFeedbacks } from './myFeedbacks'
import { DeliveryParams } from '@/delivery/types'
import { feedbackCheckRules, feedbackGetRules } from './rules'
import { createRouteHandler } from '../../routeHandler'
import { IHandler } from '../types'

type Params = Pick<DeliveryParams, 'feedbacks'>

export type FeedbacksMethods = {
  create: MakeFeedback,
  getOne: GetFeedback,
  getList: GetFeedbacksList,
  update: UpdateFeedback,
  myFeedbacks: MyFeedbacks
}

const buildFeedbacksRoutes = (methods: FeedbacksMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()

    /**
     * @openapi
     * /feedback/create:
     *  post:
     *    tags: [Feedback]
     *    produces:
     *      application/json
     *    requestBody:
     *      in: Body
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *    responses:
     *      200:
     *        description: Create feedback object
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                feedback:
     */
    namespace.post(
      '/create',
      feedbackCheckRules,
      createRouteHandler(methods.create)
    )

    namespace.post(
      '/update',
      feedbackCheckRules,
      createRouteHandler(methods.update)
    )

    namespace.get(
      '/one/:id',
      feedbackGetRules,
      createRouteHandler(methods.getOne)
    )

    namespace.get(
      '/',
      feedbackGetRules,
      createRouteHandler(methods.getList)
    )

    namespace.get(
      '/my',
      feedbackGetRules,
      createRouteHandler(methods.myFeedbacks)
    )

    root.use('/feedbacks', namespace)
  }
}

export const buildFeedbacksHandler = (params: Params): IHandler => {
  const create = buildMakeFeedback(params)
  const getOne = buildGetFeedback(params)
  const getList = buildGetFeedbacksList(params)
  const update = buildUpdateFeedback(params)
  const myFeedbacks = buildMyFeedbacks(params)

  return {
    registerRoutes: buildFeedbacksRoutes(
      {
        create,
        getOne,
        getList,
        update,
        myFeedbacks
      }
    )
  }
}