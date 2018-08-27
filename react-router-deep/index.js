import React, {Component} from 'react'
import { render } from 'react-dom'
import AppRouter from './routes/'
import { createBrowserHistory } from 'history'
import './index.css'
const history = createBrowserHistory()

// 对 react-router 的分析，目前准备主要集中在三点
// 1. history 的分析
// 2. react-router 原理分析
// 3. react-router 内部匹配原理
// 这里着重理解 history
// history v4.6+ 在内部主要导出了三个方法
// `createBrowserHistory`,`createHashHistory`,`createMemoryHistory`
// createBrowserHistory 是为现代主流浏览器提供的 api
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
// 在它自己的注释里，它说明了是基于 H5 的 history 创建对象，对象内包括了一些常用的方法譬如
// `pushState`,`replaceState`,`popstate` 等
// 那么它具体返回了什么对象呢，下面就是它目前的所有方法和属性
// const history = {
//   length: globalHistory.length, // 当前存的历史栈的数量
//   action: "POP",
//   location: initialLocation,
//   createHref,
//   push,
//   replace,
//   go,
//   goBack,
//   goForward,
//   block,
//   listen
// }
// `createHref` 根据根路径创建新路径，在根路径上添加原地址所带的 `search`, `pathname`, `path` 参数, 推测作用是将路径简化
// 其中，`go`,`goBack`,`goForward` 是对原生 history.go 的简单封装
// `push`, `replace` 则是原生方法的扩展，但相对逻辑较多，同样是跳转逻辑，而且两者有较多逻辑相同
// 这里以 push 为例, 其实就是对原生的 history.pushState 做了判断和优化，具体的过渡实现则使用了 transitionManager
// const push = (path, state) => {
//   const action = "PUSH";
//   const location = createLocation(path, state, createKey(), history.location);
//   // 过渡内容
//   transitionManager.confirmTransitionTo(
//     location,
//     action,
//     getUserConfirmation,
//     ok => {
//       if (!ok) return;
//       const href = createHref(location);
//       const { key, state } = location;
//       // 在支持 history 的地方则使用 history.pushState 方法实现
//       if (canUseHistory) {
//         globalHistory.pushState({ key, state }, null, href);
//       } else {
//         window.location.href = href;
//       }
//     }
//   );
// };
// 在使用方法之前，它首先用几个工具函数做了判断，判断该浏览器是否适用

const App = () => (
  <AppRouter history={history} />
)

render(<App/>, document.body.querySelector('#app'))
