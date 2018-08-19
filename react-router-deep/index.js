import React, {Component} from 'react'
import { render } from 'react-dom'
import AppRouter from './routes/'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

// 对 react-router 的分析，目前准备主要集中在三点
// 1. history 的分析
// 2. react-router 原理分析
// 3. react-router 内部匹配原理
// 这里着重理解 history
// history 在内部主要导出了三个方法
// `createBrowserHistory`,`createHashHistory`,`createMemoryHistory`
// createBrowserHistory 是为现代主流浏览器提供的 api
const App = () => (
  <AppRouter history={history} />
)

render(<App/>, document.body.querySelector('#app'))
