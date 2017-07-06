import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './components/App'
import todoApp from './reducers'

import './../style/todolist.css'

let store = createStore(todoApp)

// Provider 让所有子组件可以访问 store
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#content')
)

// ReactDOM.render(
//   <ReactRedux.Provider store={store}>
//     <App/>
//   </ReactRedux.Provider>,
//   document.querySelector('#content')
// )
