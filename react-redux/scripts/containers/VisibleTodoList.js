import {connect} from 'react-redux'
import TodoList from './../components/TodoList'
import {completeTodo} from './../actions'
// import {toggleTodo} from './../actions'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
  }
}

/**
 * [过滤后的 todos]
 * @return {Object} [description]
 */
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

/**
 * [将含 dispatch 的 action 传入 todo 中]
 * @return {Object} [description]
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (index) => {
      dispatch(completeTodo(index))
      // dispatch(toggleTodo(index))
    }
  }
}

// const VisibleTodoList = ReactRedux.connect({
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
