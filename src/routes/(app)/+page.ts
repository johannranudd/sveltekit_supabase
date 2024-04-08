import type { User } from "../../types/user"

export function load(): { user: User } {
  const user: User = {
    name: "john",
    email: "john@doe.com",
  }

  return { user }
}
