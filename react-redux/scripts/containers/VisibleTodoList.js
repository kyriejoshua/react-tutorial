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

// 在这里，对 connect 方法做一个简单解读
// 首先简化 connect 如下
/** 显然这是一个高阶函数，而且通过返回的函数的命名来看，该函数返回的是一个高阶组件的处理函数
 * 实际上 connectHOC 返回的是一个叫 wrapWithConnect 的函数，该函数确实是接收一个组件作为参数，然后返回一个高阶组件
 * @param {Function} mapStateToProps [这个参数的作用实际上是告知 connect 方法如何去获取 store 上的 state]
 * @param {Function} mapDispatchToProps
 * @param {Function} mergeProps
 */
const easyConnect = (mapStateToProps, mapDispatchToProps, mergeProps) => {
  // do some useful things
  return connectHOC(/* selectorFactory, extends({}) */)
}

// const VisibleTodoList = ReactRedux.connect({
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
