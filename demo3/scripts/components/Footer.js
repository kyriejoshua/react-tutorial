import React from 'react' // 必须引入
import FilterLink from '../containers/FilterLink'

/**
 * [筛选选择组件]
 * @return {JSX Object} [description]
 */
const Footer = () => (
  <p>
    Show: {" "}
    <FilterLink filter="SHOW_ALL"> All </FilterLink>
    {", "}
    <FilterLink filter="SHOW_ACTIVE"> Active </FilterLink>
    {", "}
    <FilterLink filter="SHOW_COMPLETED"> Completed </FilterLink>
  </p>
)

export default Footer
