/********** EXAMPLE 1 **********/
// 实现最基本的功能，点赞交互
const button = document.querySelector('.like-btn');
const buttonText = document.querySelector('.like-text');
let isLiked = false;
button.addEventListener('click', () => {
  isLiked = !isLiked;
  buttonText.innerHTML = isLiked ? '取消': '点赞';
});

/********** EXAMPLE 2 **********/
// 实现可复用性，将按钮写成一个类
// 简单粗暴的实现
class LikeButton {
  render() {
    return `
      <button class="like-btn">
        <span class="like-text">点赞</span>
        <span>👍</span>
      </button>
    `
  }
}

const likeButton = new LikeButton();
const wrapper = document.querySelector('.wrapper');
wrapper.innerHTML = likeButton.render();

/********** EXAMPLE 3 **********/
// 采用插入 DOM 的方式替代 innerHTML 插入的方式
// 绑定事件，但只有打印，没有交互
const createDOMFromString = (domString) => {
  const div = document.createElement('div');
  div.innerHTML = domString;
  return div;
}

class LikeButton {
  render() {
    this.ele = createDOMFromString(`
      <button class="like-btn">
        <span class="like-text">点赞</span>
        <span>👍</span>
      </button>
    `);
    this.ele.addEventListener('click', () => console.log('click'), false);
    return this.ele;
  }
}

const wrapper = document.querySelector('.wrapper');
const likeButton = new LikeButton();
wrapper.appendChild(likeButton.render());

/********** EXAMPLE 4 **********/
// 添加交互事件，改变文案
class LikeButton {
  constructor() {
    this.state = {
      isLiked: false
    }
  }

  changeLikeText() {
    const likeText = this.ele.querySelector('.like-text');
    this.state.isLiked = !this.state.isLiked;
    likeText.innerHTML = this.state.isLiked ? '取消': '点赞';
  }

  render() {
    this.ele = createDOMFromString(`
      <button class='like-btn'>
        <span class='like-text'>点赞</span>
        <span>👍</span>
      </button>
    `);

    // 注意这里要绑定该方法到该对象中 bind(this)
    this.ele.addEventListener('click', this.changeLikeText.bind(this), false);
    return this.ele;
  }
}

/********** EXAMPLE 5 **********/
// 实现单一功能原则，将改变状态的方法提取出来，方便改变多个状态时使用
// 但这次改动不会产生实际效果，因为更新后的 DOM 没有渲染到页面中
class LikeButton {
  constructor() {
    this.state = {
      isLiked: false
    }
  }

  // 这里可改变多个状态，同时更新
  setState(state) {
    this.state = state;
    this.ele = this.render();
  }

  // 仅改变单一状态，将该方法独立出来
  changeLikeText() {
    this.setState({
      isLiked: !this.state.isLiked
    });
  }

  render() {
    this.ele = createDOMFromString(`
      <button class='like-btn'>
        <span class='like-text'>${this.state.isLiked ? '取消': '点赞'}</span>
        <span>👍</span>
      </button>
    `);
    this.ele.addEventListener('click', this.changeLikeText.bind(this), false);
    return this.ele;
  }
}

/********** EXAMPLE 6 **********/
// 新增监听 DOM 更改并重新插入 DOM 的方法
class LikeButton {
  constructor() {
    this.state = {
      isLiked: false
    }
  }

  setState(state) {
    const oldEle = this.ele;
    this.state = state;
    this.ele = this.render();
    if (this.onStateChange) {
      this.onStateChange(oldEle, this.ele);
    }
  }

  changeLikeText() {
    this.setState({
      isLiked: !this.state.isLiked
    });
  }

  render() {
    this.ele = createDOMFromString(`
      <button class='like-btn'>
        <span class='like-text'>${this.state.isLiked ? '取消': '点赞'}</span>
        <span>👍</span>
      </button>
    `);
    this.ele.addEventListener('click', this.changeLikeText.bind(this), false);
    return this.ele;
  }
}

const likeButton = new LikeButton();
wrapper.appendChild(likeButton.render());
// 更新 DOM 的方法
likeButton.onStateChange = (oldEle, newEle) => {
  wrapper.insertBefore(newEle, oldEle);
  wrapper.removeChild(oldEle);
}

/********** EXAMPLE 7 **********/
// 抽象出 Component 类，可作公共组件
// 添加了 props 属性，和 React 的 props 类似，子类可继承使用
class Component {
  constructor(props={}) {
    this.props = props;
  }

  setState(state) {
    const oldEle = this.ele;
    this.state = state;
    this.ele = this.renderDOM();
    if (this.onStateChange) {
      this.onStateChange(oldEle, this.ele);
    }
  }

  renderDOM() {
    this.ele = createDOMFromString(this.render());
    this.ele.addEventListener('click', this.onClick.bind(this), false);
    return this.ele;
  }
}

// 更新方法
const mount = (wrapper, component) => {
  wrapper.appendChild(component.renderDOM());
  component.onStateChange = (oldEle, newEle) => {
    wrapper.insertBefore(newEle, oldEle);
    wrapper.removeChild(oldEle);
  }
}

class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false
    }
  }

  onClick() {
    this.setState({
      isLiked: !this.state.isLiked
    })
  }

  render() {
    return `
      <button class='like-btn'>
        <span class='like-text'>${this.props.words || ''} ${this.state.isLiked ? '取消': '点赞'}</span>
        <span>👍</span>
      </button>
    `
  }
}

const wrapper = document.querySelector('.wrapper');
const likeButton = new LikeButton({words: '这是 '});
mount(wrapper, likeButton);
