import React from 'react'
import {connect} from 'react-redux'
import {addTodo} from './../actions'

/**
 * [添加待办项组件，以表单形式提交]
 * @return {JSX Object} [description]
 */
let AddTodo = ({dispatch}) => {
  let input;

  return (
    <div>
      <form style={{display: 'flex'}}
            onSubmit={e => {
              e.preventDefault()
              if (!input.value.trim()) {
                return
              }
              dispatch(addTodo(input.value))
              input.value = ''
      }}>
        <input ref={node => {
          input = node
        }}/>
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  );
}

AddTodo = connect()(AddTodo)

export default AddTodo
