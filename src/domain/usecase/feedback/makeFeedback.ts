import { IFeedbackPost } from "@/domain/entity/feedback"
import { UseCaseParams } from "../types"
import { InternalError, NotFoundError } from "@/domain/errors"

export type MakeFeedbackPost = (params: {
  description: string,
  category: string,
  author_id: string
}) => Promise<{
    feedbackPost: IFeedbackPost
}>

export const buildFeedbackPost = ({adapter}: UseCaseParams): MakeFeedbackPost => {
  return async ({description, category, author_id}) => {
    console.log(author_id)
    const categoryData = await adapter.categoryRepository.get({
      where: {
        type: category
      },
      select: {
        id: true,
        type: true
      }
    })

    if (!categoryData) {
      throw new NotFoundError({message: 'Category data is undefined'})
    }

    const categoryType = categoryData.type
    
    const statusData = await adapter.statusesRepository.get({
      where: {
        type: "Idea"
      },
      select: {
        id: true,
        type: true
      }
    })

    if (!statusData) {
      throw new InternalError({message: 'Error with database connect'})
    }

    const ideaStatusType = statusData.type

    const feedbackPost = await adapter.feedbackRepository.create({
      data: {
        description,
        category: categoryType,
        author_id,
        status: ideaStatusType
      },
      select: {
        id: true,
        description: true,
        category: true,
        status: true,
        created_at: true,        
      }
    })

    if (!feedbackPost) {
      throw new InternalError
    }

    return { feedbackPost }
  }
}