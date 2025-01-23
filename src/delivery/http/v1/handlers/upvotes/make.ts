import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'upvotes'>

export type MakeUpvote = (req: AuthRequest, res: Response) => Promise<Response>

export const buildMakeUpvote = ({upvotes}: Params): MakeUpvote => {
  return async (req, res) => {
    const feedbacks = req.body.feedbacks
    const title = req.body.title

    const result = await upvotes.makeUpvote({
      feedbacks,
      title
    })

    return res.status(200).json(result)
  }
}