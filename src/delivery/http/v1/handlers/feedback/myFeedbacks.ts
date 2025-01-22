import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'feedbacks'>

export type MyFeedbacks = (req: AuthRequest, res: Response) => Promise<Response>

export const buildMyFeedbacks = ({feedbacks}: Params): MyFeedbacks => {
  return async (req, res) => {
    console.log(req.user.id)
    const result = await feedbacks.getMyFeedbacks({author_id: req.user.id})

    return res.status(200).json(result)
  }
}