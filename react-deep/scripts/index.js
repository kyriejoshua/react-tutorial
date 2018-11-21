import React, {Component} from 'react'
import { render } from 'react-dom'
import ExampleA from './_setState'
import ExampleC from './_pureComponent'

const App = () => (
  <div>
    <ExampleC/>
  </div>
)

render(<App/>, document.body.querySelector('#content'))
