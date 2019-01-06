## React Router Deep(打卡 app)

### Required
* node v8.6.0
* react v16.4.2
* react-router v4.3.1

### Something
* 本意是作为 react-router 库的解读，后来顺带做了一个简易的打卡的 app, 以日历方式呈现。基于 react-big-calendar, 数据保存在本地。
* UI 库使用了 [wiredelements](https://github.com/wiredjs/wired-elements) 和 [sweetalert](https://sweetalert.js.org/docs/).
* 支持打卡，编辑内容。`shift + enter` 提交。

### TODO
* 由于无法同时监听 cmd + enter, 所以目前用 shift + enter 替代。
* 缺少直接写入文件的支持。用 node 实现。

### Usage
* Run `npm start`

### Other

* 由于收到了 `github` 的安全警告。因此将 `webpack-dev-server` 升级至 **3.1.11**. 因为依赖关系， `webpack` 也不得不升至 **4.0.0**. 还添加了 `webpack-cli` 这个依赖。
* 目前当前项目已升级，暂未发现问题。其他项目后续也会升级。
* [地址](https://github.com/kyriejoshua/react-tutorial/network/alert/react-router-deep/package.json/webpack-dev-server/open)
```javascript
"dependencies": {
  "webpack-dev-server": ">=3.1.11"
}
```
