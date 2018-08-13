import React, {Component} from 'react'
import { render } from 'react-dom'
import AppRouter from './routes/'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const App = () => (
  <AppRouter history={history} />
)

render(<App/>, document.body.querySelector('#app'))
