import React, {Component} from 'react'
import { render } from 'react-dom'
import AppRouter from './routes/'
import { createBrowserHistory } from 'history'
import './index.css'
const history = createBrowserHistory()

// 对 `react-router` 的分析，目前准备主要集中在三点
// 1. `history` 的分析
// 2. `react-router` 原理分析
// 3. `react-router` 内部匹配原理
// 这里着重理解 `history`
// `history` v4.6+ 在内部主要导出了三个方法
// `createBrowserHistory`,`createHashHistory`,`createMemoryHistory`
// 它们分别有着自己的作用:
// `createBrowserHistory` 是为现代主流浏览器提供的 api
// `createHashHistory` 是为不支持 `history` 功能的浏览器提供的 api
// `createMemoryHistory` 则是为 `node` 环境提供的 api
// 我们就先从最接地气的 `createBrowserHistory` 也就是我们上文中使用的方法开始看起
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */
// 在它自己的注释里，它说明了是基于 H5 的 history 创建对象，对象内包括了一些常用的方法譬如
// `pushState`,`replaceState`,`popstate` 等
// 那么它具体返回了什么对象呢，下面就是它目前所有的方法和属性
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
// 其中，`go`,`goBack`,`goForward` 是对原生 `history.go` 的简单封装

// `push`, `replace` 方法则是原生方法的扩展，但相对逻辑较多，同样是跳转逻辑，而且两者有较多逻辑相同
// 这里以 push 为例, 其实就是对原生的 history.pushState 做了判断和优化，具体的过渡实现则使用了 `transitionManager`(下文说明)
// const push = (path, state) => {
//   const action = "PUSH";
//   const location = createLocation(path, state, createKey(), history.location);
//   // 过渡内容
//   transitionManager.confirmTransitionTo(
//     location,
//     action,
//     getUserConfirmation,
//     ok => {
//        // 布尔值，用于判断是否需要执行
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

// 当做出浏览器动作时，会触发 `popstate` 事件, 也就是说，`popstate` 本身并不是像 `pushState` 或 `replaceState` 一样是 history 的方法
// 不能使用 `history.popState` 这样的方式来调用
// 而且，直接调用 `history.pushState` 或 `history.replaceState` 不会触发 `popstate` 事件
// 在事件监听方法 `listen` 中涉及了 `popstate` 的使用，在源码中可以看到以下两个方法
// `listen` 和 `checkDOMListeners`
// const PopStateEvent = "popstate";
// const HashChangeEvent = "hashchange";
// const listen = listener => {
//   const unlisten = transitionManager.appendListener(listener);
//   checkDOMListeners(1);
//   return () => {
//     checkDOMListeners(-1);
//     unlisten();
//   };
// };
// const checkDOMListeners = delta => {
//   listenerCount += delta;
//   if (listenerCount === 1) {
//     window.addEventListener(PopStateEvent, handlePopState);
//     if (needsHashChangeListener)
//       window.addEventListener(HashChangeEvent, handleHashChange);
//   } else if (listenerCount === 0) {
//     window.removeEventListener(PopStateEvent, handlePopState);
//     if (needsHashChangeListener)
//       window.removeEventListener(HashChangeEvent, handleHashChange);
//   }
// };
// 因此，调用 `listen` 就是给 `window` 绑定了相应方法，再次调用之前 `listen` 返回的函数则是取消

// 以上几段代码中 `transitionManager` 对象出现了多次，在 `popstate` 相关方法中，它提供了 `appendListener` 方法
// 内部其实是和 `listen` 方法相似的绑定和解绑逻辑，调用是绑定箭头事件，返回一个解绑函数，该解绑函数再次调用的话就是解绑事件
// const appendListener = fn => {
//   let isActive = true;
//   const listener = (...args) => {
//     if (isActive) fn(...args);
//   };
//   listeners.push(listener);
//   return () => {
//     isActive = false;
//     listeners = listeners.filter(item => item !== listener);
//   };
// };

// 另一个用的较多的方法 `confirmTransitionTo`
// const confirmTransitionTo = (
//   location,
//   action,
//   getUserConfirmation,
//   callback
// ) => {
//   if (prompt != null) {
//     const result =
//       typeof prompt === "function" ? prompt(location, action) : prompt;
//     if (typeof result === "string") {
//       if (typeof getUserConfirmation === "function") {
//         getUserConfirmation(result, callback);
//       } else {
//         callback(true);
//       }
//     } else {
//       // Return false from a transition hook to cancel the transition.
//       // 如果已经在执行，则暂时停止执行
//       callback(result !== false);
//     }
//   } else {
//     callback(true);
//   }
// };
// 实际上执行的就是从外部传进来的 `callback` 方法，只是多了几层判断，而且传入了布尔值来控制是否需要真的执行回调函数
// 在使用方法之前，它首先用几个工具函数做了判断，判断该浏览器是否适用

const App = () => (
  <AppRouter history={history} />
)

render(<App/>, document.body.querySelector('#app'))
