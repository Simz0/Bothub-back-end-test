import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'feedbacks'>

export type MyFeedbacks = (req: AuthRequest, res: Response) => Promise<Response>

export const buildMyFeedbacks = ({feedbacks}: Params): MyFeedbacks => {
  return async (req, res) => {
    let result
    let status = 200
    const pageOptions = req.query['page']? req.query['page'] : {}
    
    if (!Number(pageOptions) && Number(pageOptions) !== 0 && req.query['page']) {
      result = {status: 'error', message: 'The page number must be a number starting from zero'}
      status = 400
    } else {
      const countOfFeedbacks = await feedbacks.getFeedbackCount({})
      const queryResult = await feedbacks.getMyFeedbacks({author_id: req.user.id, skip: req.query['page'] ? Number(pageOptions) * 10 : 0, take: req.query['page'] ? 10 : countOfFeedbacks})
      result = {
        data: queryResult,
        'FeedbacksDbCount': countOfFeedbacks,
        haveMore: req.query['page'] ? ((Number(pageOptions) + 1) * 10 > countOfFeedbacks? false : true) : false,
        page: Number(pageOptions)
      }
    }
    return res.status(200).json(result)
  }
}