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

const createDOMFromString = (domString) => {
  const div = document.createElement('div');
  div.innerHTML = domString;
  return div;
}

const mount = (wrapper, component) => {
  wrapper.appendChild(component.renderDOM());
  component.onStateChange = (oldEle, newEle) => {
    wrapper.insertBefore(newEle, oldEle);
    wrapper.removeChild(oldEle);
  }
}

const wrapper = document.querySelector('.wrapper');
const likeButton = new LikeButton({words: '这是 '});
mount(wrapper, likeButton);
