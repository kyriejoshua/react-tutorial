import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './components/App'
import todoApp from './reducers'

import './../style/todolist.css'

let store = createStore(todoApp)
/*
store = {
  dispatch: f(), // 派发 action
  getState: f(), // 获取 store
  subscribe: f(), // 暂时木知
  replaceReducer: f(), // 猜测是用于更新 reducer
  Symbol(observable): f() // 暂时木知
}
 */

/**
 * Provider 让所有子组件可以访问 store
 * 自己理解的逻辑整理如下：
 * Provider 由一个自执行函数(匿名函数)生成，该函数返回了一个新的函数，并且保存了外部的变量 storeKey 即后来的在默认情况下的 "store"
 * 通过上述匿名函数，此时生成的 Provider 则是继承了 ReactComponent
 * 然后在 Provider 方法中，调用 _Component 即 ReactComponent 构造函数
 * 在原 ReactComponent 实例上加上 props、context、refs、updater、等初始化属性的
 * 源代码注释解释，这部分属性是为了更好地更新组件内部状态 state
 * 再然后显式的保存 store 属性
 * 下面是一个简化版的 createProvider
  function createProvider() {

    var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';

    var Provider = function (_Component) {
      _inherits(Provider, _Component);

      Provider.prototype.getChildContext = function getChildContext() {
      };

      function Provider(props, context) {
        _classCallCheck(this, Provider);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context)); // _Component 即 ReactComponent

        _this[storeKey] = props.store;
        return _this;
      }

      Provider.prototype.render = function render() {
        return _react.Children.only(this.props.children);
      };

      return Provider;
    }(_react.Component);

    Provider.propTypes = {
      store: _PropTypes.storeShape.isRequired,
      children: _propTypes2.default.element.isRequired
    };
    Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = _PropTypes.storeShape.isRequired, _Provider$childContex[subscriptionKey] = _PropTypes.subscriptionShape, _Provider$childContex);
    Provider.displayName = 'Provider';

    return Provider;
  }
 */
/**
 * 其中的 _Component 构造函数
 * Base class helpers for the updating state of a component.
  function ReactComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.refs = emptyObject;
    // We initialize the default updater but the real one gets injected by the
    // renderer.
    this.updater = updater || ReactNoopUpdateQueue;
  }
 */

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
