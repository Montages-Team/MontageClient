import { Query } from "hyperapp-apollo"
import gql from "graphql-tag"

const TODO_APP_QUERY = gql`
  query TodoAppQuery($userId: Int!) {
    todos(userId: $userId) {
      id
      text
    }
  }
`

export const TodoApp = ({ userId }) => (
  <Query
    key={`todoApp-${userId}`}
    query={TODO_APP_QUERY}
    variables={{
      userId
    }}
    render={({ data, loading, refetch }) => (
      <div>
        { loading ?
          <div>loading...</div>
        :
          <div>
            <button onclick={refetch}>Refresh</button>
            <ul>
              {data && data.todos && data.todos.map(todo =>
                <li key={todo.id}>{todo.text}</li>
              )}
            </ul>
          </div>
        }
      </div>
    )}
  />
}