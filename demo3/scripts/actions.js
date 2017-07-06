// 所有的 action 定义
export const ADD_TODO = 'ADD_TODO';
export const COMPLETED_TODO = 'COMPLETED_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function addTodo(text) {
  return {type: ADD_TODO, text}
}

export function completeTodo(index) {
  return {type: COMPLETED_TODO, index}
}

export function setVisibilityFilter(filter) {
  return {type: SET_VISIBILITY_FILTER, filter}
}
