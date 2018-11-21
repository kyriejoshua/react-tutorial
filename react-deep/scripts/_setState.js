import React, { Component } from 'react'
import { WiredButton, WiredCard } from 'wired-elements'

class ExampleA extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      clicked: 0
    }
    this.addCount = this.addCount.bind(this)
  }

  componentWillMount() {
    // this.setState({ count: 1 }) // 没毛病但通常不建议这样做
  }

  // shouldComponentUpdate(nextProps, nextState) {
  // }

  componentWillUpdate(nextProps, nextState) {
    console.info('will update', nextProps, nextState)
    // this.setState({ count: 1 }) // 会不断进入该生命周期导致死循环
  }
  componentDidUpdate(prevProps, prevState) {
    console.info('did update', prevProps, prevState)
  }

  componentDidMount() {
    // 在这里的 setState 调用栈可以查看到是在 _renderNewRootComponent 方法中执行 batchedMountComponentIntoNode 事务(transaction)
    // 调用栈详情见图 ../assets/setState/_renderNewRootComponent.png
    this.setState({ count: this.state.count + 1 })
    console.info(this.state.count) // 0
    this.setState({ count: this.state.count + 1 })
    console.info(this.state.count) // 0

    window.setTimeout(() => {
      this.setState({ count: this.state.count + 1 })
      console.info(this.state.count) // 2

      this.setState({ count: this.state.count + 1 })
      console.info(this.state.count) // 3
    });
  }

  // let batchingStrategy = {
  //   isBatchingUpdates: false,
  //   batchedUpdates: (callback, a, b, c, d, e) => {
  //     this.isBatchingUpdates = true
  //     transActions.perform(callback, null, a, b, c, d, e)
  //     // 查看调用栈发现有 mountComponentIntoNode 事务进行中，结合 isBatchingUpdates 标志位判断，所以 setstate 后并不会马上更新
  //     // 往外回溯可发现 mountComponentIntoNode 的外部调用栈 _renderNewRootComponent, 这里推断应当是 componentDidMount 时在进行的
  //     // 如果是在其他生命周期里或者是函数调用则会是其他的，例如下文点击里的 dispatchEvent
  //   }
  // }
  // 部分源码
  // https://github.com/facebook/react/blob/35962a00084382b49d1f9e3bd36612925f360e5b/src/renderers/shared/reconciler/ReactUpdates.js#L199

  _enqueueUpdate(component) {
    // ...
    if (!batchingStrategy.isBatchingUpdates) {
      batchingStrategy.batchedUpdates(this._enqueueUpdate, component)
      return
    }
    dirtyComponents.push(component)
  }

  // 一个调用栈的简约流程
  // this.setState
  // this.updater.enqueueSetState(this, partialState)
  // var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = [])
  // queue.push(partialState)
  // new state 存入 pending 队列 => pendingStateQueue
  // this.enqueueUpdate(internalInstance) 即 ReactUpdates.enqueueUpdate(Component)，然后 dirtyComponent.push(Component)
  // this.enqueueCallback()

  addCount() {
    // 在这里的 setState 调用栈可以查看到是在 dispatchEvent 方法中执行 topClick 事务(transaction)
    // 调用栈详情见图 ../assets/setState/dispatchEvent.png
    this.setState({ clicked: this.state.clicked + 1})
    this.setState({ clicked: this.state.clicked + 1})
    console.info(this.state.clicked) // 3 相当于合并了2次为1次
  }

  render() {
    // this.setState({ count: 1 }) // 会不断进入该生命周期导致死循环
    return(
      <wired-card>
        <h3>setState Example</h3>
        <h4>count: {this.state.count}</h4>
        <h4>clicked: {this.state.clicked}</h4>
        <wired-button onClick={this.addCount}> state + 1
        </wired-button>
      </wired-card>
    )
  }
}

export default ExampleA

// Transaction 的简易实现
// import Transaction from 'transactions'

// let MyTransaction = () => {
//   // do sth
// }

// Object.assign(MyTransaction.prototype, Transaction.mixin, {
//   getWrapperTransactions: () => {
//     return [{
//       initialize: () => {
//         console.info('before perform')
//       },
//       close: () => {
//         console.info('after perform')
//       }
//     }]
//   }
// })

// const testTransaction = () => {
//   console.info('performing')
// }

// const myTransaction = new MyTransaction()
// myTransaction.perform(testTransaction)
// 'before perform'
// 'performing'
// 'after perform'

// 参考
// https://zhuanlan.zhihu.com/p/20328570
// http://undefinedblog.com/what-happened-after-set-state/
