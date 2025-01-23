import { AdapterParams } from "@/adapter/types"
import { buildCount, Count } from "./count"
import { buildCreate, Create } from "./create"
import { buildGet, Get } from "./get"
import { buildList, List } from "./list"
import { buildUpdate, Update } from "./update"
import { buildDelete, Delete } from "./delete"

type Params = Pick<AdapterParams, 'db'>

export type UpvotesRepository = {
  count: Count,
  create: Create,
  delete: Delete,
  get: Get,
  list: List,
  update: Update
}

export const buildUpvotesRepository = (params: Params): UpvotesRepository => {
  const count = buildCount(params)
  const create = buildCreate(params)
  const deleteFeedback = buildDelete(params)
  const get = buildGet(params)
  const list = buildList(params)
  const update = buildUpdate(params)

  return {
    count,
    create,
    delete: deleteFeedback,
    get,
    list,
    update
  }  
}