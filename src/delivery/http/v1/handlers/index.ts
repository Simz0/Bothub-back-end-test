import Express from 'express'
import { IHandler } from './types'
import { DeliveryParams } from '@/delivery/types'
import { buildExampleHandler } from './example'
import { buildAuthHandler } from './auth'
import { buildFeedbacksHandler } from './feedback'
import { buildUpvotesHandler } from './upvotes'
import { buildSeedsHandler } from './seeds'

export const buildHandler = (params: DeliveryParams): Express.Router => {
  const router = Express.Router()

  const handlers: Array<IHandler> = [
    buildAuthHandler(params),
    buildExampleHandler(params),
    buildFeedbacksHandler(params),
    buildUpvotesHandler(params),
    buildSeedsHandler(params)
  ]

  for (const handler of handlers) {
    handler.registerRoutes(router)
  }

  return router
}
