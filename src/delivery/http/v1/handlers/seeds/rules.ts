import { authRequired } from "../../middlewares";

export const seedsGetRules = [
  authRequired({})
]