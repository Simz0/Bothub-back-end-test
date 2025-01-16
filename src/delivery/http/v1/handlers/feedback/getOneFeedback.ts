import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'feedbacks'>

export type GetFeedback = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetFeedback = ({feedbacks}: Params): GetFeedback => {
  return async (req, res) => {
    const id = req.params['id']

    const result = await feedbacks.getFeedback({id})

    return res.status(200).json(result)
  }
}