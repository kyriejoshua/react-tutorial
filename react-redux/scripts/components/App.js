import React from 'react' // 必须引入
import Footer from './Footer'
import AddTodo from './../containers/AddTodo'
import VisibleTodoList from './../containers/VisibleTodoList'

/**
 * [组件内容: 添加组件，筛选组件，结果显示组件]
 * @return {JSX Object} [description]
 */
const App = () => (
  <div style={{
        boxShadow: '0 2px 4px #bdbdbd',
        padding: '20px'
  }}>
    <AddTodo/>
    <Footer/>
    <VisibleTodoList/>
  </div>
)

export default App
