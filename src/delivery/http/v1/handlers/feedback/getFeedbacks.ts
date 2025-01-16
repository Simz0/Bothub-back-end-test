import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'feedbacks'>

export type GetFeedbacksList = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetFeedbacksList = ({feedbacks}: Params): GetFeedbacksList => {
  return async (req, res) => {
    const result = await feedbacks.getFeedbacksList({})

    return res.status(200).json(result)
  }
}