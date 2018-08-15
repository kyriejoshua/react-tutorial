import React from 'react'
import { Router, Route } from 'react-router'
import Home from './../app/home'

const prefix = process.env.prefix
// TODO prefix 前缀用法需要特殊处理
const AppRouter = ({ history }) => (
  <Router history={history}>
    <div id="content">
      <Route exact path='/' render={() => (<h1>Index</h1>)} />
      <Route path='/home' component={Home} />
      {/* <Route path={`${prefix}/home`} component={Home} /> */}
    </div>
  </Router>
)

export default AppRouter
