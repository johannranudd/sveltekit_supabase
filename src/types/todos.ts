export interface Todo {
  id: number
  created_at: string
  title: string
  completed: boolean
  description: string
}

export interface Todos {
  todos: Todo[]
  error: any
}
