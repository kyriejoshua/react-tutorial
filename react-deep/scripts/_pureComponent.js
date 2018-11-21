import React, { Component, PureComponent } from 'react'
import { WiredButton, WiredCard } from 'wired-elements'

// 无状态组件，完全依赖于 props 的变化
/**
 * [1. 内部没有自己的状态
 *  2. 渲染内容完全依赖于传入的 props
 *  3. 没有生命周期，但可以通过高阶组件的形式来实现
 *  4. 写法更简洁
 *  5. 占内存更小
 *  6. 可拓展性强，可组合使用，currying 使用]
 * @param  {Object} props [description]
 * @return {[type]}       [description]
 */
const StatelessComponent = (props) => {
  console.info('stateless', props)
  return (<h4>stateless: {props.clicked}</h4>)
}

export default class ExampleC extends PureComponent {
  constructor() {
    super()
    this.state = {
      clicked: 0
    }
  }

  /**
   * [随机确定是否更新数字，如果使用 Component 而不做任何修改,
   * 则不论 state 是否改变，每次都会 render
   * 使用 PureComponent 则会自动做一层浅比较，因此不会每次更新，当只有 state 真的改变时才会更新
   * 或者用手动修改 shouldComponentUpdate 来配合 Component 使用]
   */
  handleClick = () => {
    const currentTime = new Date().getTime()
    let { clicked } = this.state
    this.setState({
      clicked: currentTime % 2 ? clicked + 1 : clicked
    })
  }

  /**
   * 原文: https://reactjs.org/docs/react-api.html#reactpurecomponent
   * React.PureComponent is similar to React.Component.
   * The difference between them is that React.Component doesn’t implement shouldComponentUpdate(),
   * but React.PureComponent implements it with a shallow prop and state comparison.
   */
  /**
   * [shouldComponentUpdate Component 与 CureComponent 的区别在于这个生命周期
   * Component 里的这个生命周期，默认不执行，或者理解为默认返回 true,
   * 也就是说任一 state 或 props 的更新，都会引起 rerender，
   * 但仍可以手动加上这个生命周期来控制。
   * 而 PureComponent 会在这个生命周期里默认做一层浅比较来返回布尔值，
   * 以此控制是否需要 rerender]
   * @param  {Object} nextProps [更新后的 props]
   * @param  {Object} nextState [更新后的 state]
   * @return {Boolean}           [description]
   */
  // shouldComponentUpdate (nextProps, nextState) {
  //   console.warn('this', this.props, this.state)
  //   console.warn('next', nextProps, nextState)
  //   // return true
  //   return nextProps !== this.props || nextState !== this.state
  // }

  render() {
    console.info('i am rendering now', `clicked: ${this.state.clicked}`)
    return (
      <wired-card>
        <h3>PureComponent Example</h3>
        <h4>clicked: {this.state.clicked}</h4>
        <StatelessComponent clicked={this.state.clicked} />
        <wired-button onClick={this.handleClick}>
          changing state
        </wired-button>
      </wired-card>
    )
  }
}

// 在 pureComponent 的 shouldComponentUpdate 生命周期中，默认的浅拷贝，可见是这样的
// var shallowEqual = require('shallowEqual');
function shallowCompare(instance, nextProps, nextState) {
  return (
    !shallowEqual(instance.props, nextProps) ||
    !shallowEqual(instance.state, nextState)
  );
}
// module.exports = shallowCompare;
// 即比较当前实例的 props 以及 state 和更新后的区别
// 参考：https://github.com/facebook/react/blob/35962a0008/src/addons/shallowCompare.js?1542792303036

// 至于这里的 shallowEqual 就是浅比较
// 内部实现其实主要依赖于 es6 的一个方法 Object.is
// 它类似于 === 的功能，但补充了 === 在比较时的不足，
// 例如 +0 === -0 和 NaN === NaN 这两种特殊情况

// 这里做一个模拟 Object.is 的实现
/**
 * [is 其实就是 Object.is]
 * @param  {Any}  a [description]
 * @param  {Any}  b [description]
 * @return {Boolean}   [description]
 */
function is(a, b) {
  if (a === b) {
    // 处理 +0 === -0 返回为 true
    return a !== 0 || b !== 0 || 1 / a === 1 / b
  } else {
    // 处理 NaN === NaN 为 false 的情况
    return a !== a && b !== b
  }
}

/**
 * [shallowEqual 浅比较]
 * @param  {Any} obj1 [description]
 * @param  {Any} obj2 [description]
 * @return {Boolean}      [description]
 */
function shallowEqual(obj1, obj2) {
  // 对基本数据类型的比较
  if (is(obj1, obj2)) return true

  // 这里是对上述遗漏的基本类型的对比的补充，但暂时没想到在哪些情况下会进入到此逻辑中
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null ) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // 如果长度不等，直接返回不等
  if (keys1.length !== keys2.length) return false

  // 相等时，再做遍历的比较
  for (let i = 0; i < keys1.length; i++) {
    let key = keys1[i]
    // 使用 hasOwnProperty 来判断在 obj2 中是否有 obj1 的方法
    if (!Object.hasOwnProperty.call(obj2, key) || !is(obj1[key], obj2[key])) {
      return false
    }
  }

  // 到此结束，也就是说，无法在对象的属性里再比较对象类型的数据
  // 如果要深比较，则涉及到递归遍历，下次再拓展
  return true
}
