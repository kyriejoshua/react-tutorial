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
