import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'feedbacks'>

export type GetFeedbacksList = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetFeedbacksList = ({feedbacks}: Params): GetFeedbacksList => {
  return async (req, res) => {
    const pageOptions = req.query['page']? req.query['page'] : {}
    
    let result
    let status = 200
    
    if (!Number(pageOptions) && Number(pageOptions) !== 0 && req.query['page']) {
      result = {status: 'error', message: 'The page number must be a number starting from zero'}
      status = 400
    } else {
      const countOfFeedbacks = await feedbacks.getFeedbackCount({})
      const queryResult = await feedbacks.getFeedbacksList({skip: req.query['page'] ? Number(pageOptions) * 10 : 0, take: req.query['page'] ? 10 : countOfFeedbacks})
      result = {
        data: queryResult,
        'FeedbacksDbCount': countOfFeedbacks,
        haveMore: req.query['page'] ? ((Number(pageOptions) + 1) * 10 > countOfFeedbacks? false : true) : false,
        page: Number(pageOptions)
      }
    }

    return res.status(status).json(result)
  }
}