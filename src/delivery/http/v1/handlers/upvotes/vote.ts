import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'upvotes'>

export type CastVote = (req: AuthRequest, res: Response) => Promise<Response>

export const buildCastVote = ({upvotes}: Params): CastVote => {
  return async (req, res) => {
    const feedbackIndex = req.body.index
    const upvoteId = req.body.id

    const result = await upvotes.vote({upvoteId, feedbackIndex})

    return res.status(200).json(result)
  }
}