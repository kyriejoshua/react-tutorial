import React, {PropTypes} from 'react'
const T = PropTypes

/**
 * [单个的待办项目]
 * @return {JSX Object} [description]
 */
const Todo = ({onClick, completed, text}) => (
  <li onClick={onClick}
      style={{
        textDecoration: completed ? 'line-through': 'none',
        cursor: completed ? 'default': 'pointer',
        height: '36px',
        lineHeight: '36px'
  }}>
    {text}
  </li>
)

Todo.propTypes = {
  onClick: T.func.isRequired,
  completed: T.bool.isRequired,
  text: T.string.isRequired
}

export default Todo
