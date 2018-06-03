import React, {Component} from 'react'
import { render } from 'react-dom'
import ExampleA from './_setState'

const App = () => (
  <div>
    <ExampleA/>
  </div>
)

render(<App/>, document.body.querySelector('#content'))
