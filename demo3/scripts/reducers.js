import {combineReducers} from 'redux'
import {ADD_TODO, COMPLETED_TODO, SET_VISIBILITY_FILTER, VisibilityFilters} from './actions'
const {SHOW_ALL} = VisibilityFilters

/**
 * [visibilityFilter 过滤显示列表]
 * @param  {[type]} state  [description]
 * @param  {Object} action [{type: [ADD_TODO/COMPLETED_TODO/SET_VISIBILITY_FILTER]}]
 * @return {String}        [description]
 */
function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

/**
 * [todos 对单个待办项的操作]
 * @param  {Array}  state  [待办项列表]
 * @param  {Object} action [{type: [ADD_TODO/COMPLETED_TODO/SET_VISIBILITY_FILTER]}]
 * @return {Array}         [description]
 */
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case COMPLETED_TODO:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true
        }),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

// const todoApp = Redux.combineReducers({
const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
