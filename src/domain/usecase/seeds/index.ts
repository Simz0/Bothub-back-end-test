import { UseCaseParams } from "../types";
import { buildGetCategorys, GetCategorys } from "./categorys";
import { buildGetStatuses, GetStatuses } from "./statuses";

export type SeedsUseCase = {
  statuses: GetStatuses,
  categorys: GetCategorys
}

export const buildSeedsUseCase = (params: UseCaseParams): SeedsUseCase => {
  const statuses = buildGetStatuses(params)
  const categorys = buildGetCategorys(params)

  return {
    statuses,
    categorys
  }
}