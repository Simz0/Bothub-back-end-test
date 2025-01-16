import { Response } from 'express'
import { AuthRequest } from '../types'
import { DeliveryParams } from '@/delivery/types'

type UpdateFeedbackBody = {
  id: string,
  description: string,
  status?: string,
  category?: string
}
type Params = Pick<DeliveryParams, 'feedbacks'>

export type UpdateFeedback = (req: AuthRequest, res: Response) => Promise<Response>

export const buildUpdateFeedback = ({feedbacks}: Params): UpdateFeedback => {
  return async (req, res) => {
    let result
    const {
      id, 
      description,
      status,
      category
    } = req.body as UpdateFeedbackBody

    const feedbackData = await feedbacks.getFeedback({id})

    if (description !== undefined && description !== '') feedbackData.description = description
    if (category !== undefined && category !== '') feedbackData.category = category
    if (status !== undefined && status !== '') feedbackData.status = status

    //не пускает дальше формирование обновления без доп.проверки
    //хотя вроде перепроверил все типы и не знаю, что за дичь ://
    if (feedbackData.description !== null) {
      result = await feedbacks.updateFeedbackPost({
        id: id,
        description: feedbackData.description,
        category: feedbackData.category,
        status: feedbackData.status
      })
    }
    
    return res.status(200).json(result)
  }
}