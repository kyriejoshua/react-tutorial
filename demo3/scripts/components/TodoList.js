import React, {PropTypes} from 'react'
import Todo from './Todo'
const T = PropTypes

/**
 * [列表组件]
 * @return {JSX Object} [description]
 */
const TodoList = ({todos, onTodoClick}) => (
  <ul>
    {todos.map((todo, index) =>
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    )}
  </ul>
)

TodoList.propTypes = {
  // 数组内每个对象属性值对应的类型
  todos: T.arrayOf(T.shape({
    completed: T.bool.isRequired,
    text: T.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: T.func.isRequired
}

export default TodoList
