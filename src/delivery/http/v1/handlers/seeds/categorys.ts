import {Response} from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type Params = Pick<DeliveryParams, 'seeds'>

export type GetCategorysList = (req: AuthRequest, res: Response) => Promise<Response>

export const buildGetCategorysList = ({seeds}: Params): GetCategorysList => {
  return async (req, res) => {
    const result = await seeds.categorys({})

    return res.status(200).json(result)
  }
}

