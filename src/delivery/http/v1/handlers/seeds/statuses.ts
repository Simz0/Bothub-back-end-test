import {Response} from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'seeds'>

export type GetStatusesList = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetStatusesList = ({seeds}: Params): GetStatusesList => {
  return async (req, res) => {
    const result = await seeds.statuses({})

    return res.status(200).json(result)
  }
}

