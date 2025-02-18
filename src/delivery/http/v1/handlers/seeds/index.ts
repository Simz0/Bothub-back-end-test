import Express from 'express'
import { buildGetStatusesList, GetStatusesList } from './statuses'
import { buildGetCategorysList, GetCategorysList } from './categorys'
import { DeliveryParams } from '@/delivery/types'
import { createRouteHandler } from '../../routeHandler'
import { IHandler } from '../types'
import { seedsGetRules } from './rules'

type Params = Pick<DeliveryParams, 'seeds'>

export type SeedsMethods = {
  statuses: GetStatusesList,
  categorys: GetCategorysList
}

const buildSeedsRoutes = (methods: SeedsMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()

    /**
     * @openapi
     * /seeds/categorys:
     *  get:
     *    tags: [Seeds]
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
     *                $ref: '#/components/entities/FeedbackCategorys'
     */
    namespace.get(
      '/categorys',
      seedsGetRules,
      createRouteHandler(methods.categorys)
    )

        /**
     * @openapi
     * /seeds/statuses:
     *  get:
     *    tags: [Seeds]
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
     *                $ref: '#/components/entities/FeedbackStatuses'
     */
    namespace.get(
      '/statuses',
      seedsGetRules,
      createRouteHandler(methods.statuses)
    )

    root.use('/seeds', namespace)
  }
}

export const buildSeedsHandler = (params: Params): IHandler => {
  const statuses = buildGetStatusesList(params)
  const categorys = buildGetCategorysList(params)

  return {
    registerRoutes: buildSeedsRoutes(
      {
        statuses,
        categorys
      }    
    )
  }
}