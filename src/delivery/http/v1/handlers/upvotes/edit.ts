import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'upvotes'>

export type EditUpvote = (req: AuthRequest, res: Response) => Promise<Response>

export const buildEditUpvote = ({upvotes}: Params): EditUpvote => {
  return async (req, res) => {
    const 
      id = req.body.id, 
      title = req.body.title, 
      feedbacks = req.body.feedbacks, 
      votes = req.body.votes

    const result = await upvotes.edit({id, title, feedbacks, votes})

    return res.status(200).json(result)
  }
}