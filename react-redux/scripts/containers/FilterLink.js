import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

/**
 * [将 store state 映射到 props 上]
 * @param  {Object} ownProps [即 props]
 * @return {Object} [必须是一个对象]
 */
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

/**
 * [分发 action 到期望的 props(Link) 上]
 * @return {Object} [description]
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

/**
 * [FilterLink 使用 connect 方法将组件 Link 与 Redux 关联起来]
 * @type {注意这里直接传入形参，不是传入对象！}
 */
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
