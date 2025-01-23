import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'upvotes'>

export type GetUpvotes = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetUpvotes = ({upvotes}: Params): GetUpvotes => {
  return async (req, res) => {
    let result
    let status = 200
    const pageOptions = req.query['page']? req.query['page'] : {}
    if (!Number(pageOptions) && Number(pageOptions) !== 0 && req.query['page']) {
      result = {status: 'error', message: 'The page number must be a number starting from zero'}
      status = 400
    } else {
      const countOfUpvotes = await upvotes.count({}) 
      const queryResult = await upvotes.listGet({skip: req.query['page']? Number(pageOptions) * 10 : 0, take: req.query['page']? 10: countOfUpvotes})
      result = {
        data: queryResult,
        'UpvoteDbCount': countOfUpvotes,
        haveMore: req.query['page'] ? ((Number(pageOptions) + 1) * 10 > countOfUpvotes? false : true) : false,
        page: Number(pageOptions)
      }
    }

    return res.status(status).json(result)
  }
}