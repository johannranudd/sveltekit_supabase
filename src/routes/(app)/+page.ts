import type { User } from "../../types/user"

export const load = (): { user: User } => {
  const user: User = {
    name: "john",
    email: "john@doe.com",
  }

  return { user }
}
