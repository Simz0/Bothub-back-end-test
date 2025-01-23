import { UseCaseParams } from "../types"
import { InternalError, NotFoundError } from "@/domain/errors"
import { ICategory } from "@/domain/entity/categorys"

export type GetCategorys = (params: {}) => Promise<Array<ICategory>>

export const buildGetCategorys = ({adapter}: UseCaseParams): GetCategorys => {
  return async ({}) => {
    const categorys = await adapter.categoryRepository.list({})

    return categorys
  }
}