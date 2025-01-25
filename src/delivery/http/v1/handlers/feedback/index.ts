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
     * /feedback/:
     *  get:
     *    tags: [Feedback]
     *    security:
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/entities/FeedbackPost'
     */
    namespace.get(
      '/',
      feedbackGetRules,
      createRouteHandler(methods.getList)
    )

    /**
     * @openapi
     * /feedback/my:
     *  get:
     *    tags: [Feedback]
     *    security:
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    responses:
     *      200:
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/entities/FeedbackPost'
     */
    namespace.get(
      '/my',
      feedbackGetRules,
      createRouteHandler(methods.myFeedbacks)
    )
    
    /**
     * @openapi
     * /feedback/one/:id:
     *  get:
     *    tags: [Feedback]
     *    security:
     *      - bearerAuth: []
     *    produces:
     *      - application/json
     *    parameters:
     *      - name: id
     *        in: params
     *        description: Идентификатор получаемого фидбека
     *        required: true
     *    responses:
     *      200:
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/entities/FeedbackPost'
     */

    namespace.get(
      '/one/:id',
      feedbackGetRules,
      createRouteHandler(methods.getOne)
    )

    /**
     * @openapi
     * /feedback/create:
     *  post:
     *    tags: [Feedback]
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
     *            $ref: '#/components/rules/feedback'
     *    responses:
     *      200:
     *        description: Create feedback object
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                feedback:
     *                  $ref: '#/components/entities/FeedbackPost'
     */
    namespace.post(
      '/create',
      feedbackCheckRules,
      createRouteHandler(methods.create)
    )

    /**
     * @openapi
     * /feedback/update:
     *  post:
     *    tags: [Feedback]
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
     *            $ref: '#/components/rules/feedback'
     *            status:
     *              type: string
     *    responses:
     *      200:
     *        description: Update feedback object
     *        content:
     *          application/json:
     *            schema:
     *              properties:
     *                feedback:
     *                  $ref: '#/components/entities/FeedbackPost'
     */
    namespace.post(
      '/update',
      feedbackCheckRules,
      createRouteHandler(methods.update)
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