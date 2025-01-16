import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'feedbacks'>

export type MakeFeedback = (req: AuthRequest, res: Response) => Promise<Response>

export const buildMakeFeedback = ({feedbacks}: Params): MakeFeedback => {
  return async (req, res) => {
    const {description, category, } = req.body

    const result = await feedbacks.makeFeedbackPost({
      description,
      category,
      author_id: req.user?.id
    })

    return res.status(200).json(result)
  }
}
