import React, { Component } from 'react'

export default class ExampleB extends Component {
  shouldComponentUpdate(nextProps, nextState) {

  }
}

// 性能优化部分
// 1. 使用无状态组件来替代普通组件
const PureComponent = () => (
  <div>Here is Pure Component</div>
)

// 2. shouldComponentUpdate 内部做判断, 比较 nextProps, nextState 和当前的变化
// 避免后续的 diff 计算，componentWillUpdate, render 等等
// shouldComponentUpdate 做性能优化的本质在于调用时机
// 例如 props 或 state 可能会有变化，涉及对象的一层嵌套或仅仅是原始数据类型的变化，使用 PureComponent 是个较好的选择，自动浅拷贝比较
// 如果 props 或 state 总是在变化，那么直接用原来的 Component 即可，避免进行多余的比较
// 如果 props 或 state 可能会有变化，但不确定是否是深层嵌套的对象，immutablejs 的数据方案会更加合适

// 3. 使用 const 来替代 let 声明变量

// 4. 使用 immutable.js 来存储数据，减少 deepcopy 的次数，因为 deepcopy 也是耗性能的
// immutable.js 的原理是持久化数据结构

// 5. map 生成列表数据时添加唯一标识 key, 且不能使用 index 这类可能会变化的变量。
// key 能帮助 react 更新，减少不必要的 diff 计算

// 6. 减少 refs 的使用，避免直接的 dom 操作

// 7. bind 方法在 constructor 内完成, 减少重复调用
this.handleChange = this.handleChange.bind(this)

// 8. 复杂页面拆分成多个单个组件，方便 react diff 比对
// 类似一棵树的所有节点的比较转化为单一节点的比较

// 9. 按需加载
