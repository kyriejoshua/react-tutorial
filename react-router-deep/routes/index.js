import React from 'react'
import { Router, Route } from 'react-router'
import Home from './../app/home'

// TODO home 页面暂时无法跳转
const AppRouter = ({ history }) => (
  <Router history={history}>
    <div id="content">
      <Route exact={true} path='/' render={() => (<h1>Index</h1>)} />
      <Route path='/home' component={Home} />
    </div>
  </Router>
)

export default AppRouter
