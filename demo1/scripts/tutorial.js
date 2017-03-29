// 以下方法可以解决 markdown 生成原生标签的问题，但框架并不推荐使用
const Comment = React.createClass({
  rawMarkup() {
    const md = new Remarkable();
    const rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
      </div>
    );
  }
});

// 挂钩数据模型，mock 一些数据
const data = [
  {
    id: 1,
    author: 'Pete Hunt',
    text: 'This is a comment'
  },
  {
    id: 2,
    author: 'Jordan Walk',
    text: 'This is a *another* comment'
  }
];

// 动态渲染数据
const CommentList = React.createClass({
  render() {
    const commentNodes = this.props.data.map((comment) => {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

// 可交互的表单，输入文字发表评论
const CommentForm = React.createClass({
  getInitialState() {
    return {
      author: '',
      text: ''
    }
  },
  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    const author = this.state.author.trim();
    const text = this.state.text.trim();
    if (!text || !author) {
      return;
    }

    // 向服务器发送请求，由父组件传递过来
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange}/>
        <input type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange}/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

// 优化逻辑 实现评论增加的实时刷新，使用浏览器 api fetch 来替代 ajax
const CommentBox = React.createClass({
  loadCommentsFromServer() {

    // 注意，这里须使用 ES6 的箭头函数写法，否则要保存当前的 this
    window.fetch(this.props.url).then((response) => {
      return response.json()
      .then((json) => {
        this.setState({data: data});
      }.bind(this))
      .catch((e) => {
        console.error('Oops, error.');
      }.bind(this));
    });
  },
  handleCommentSubmit(comment) {
    let comments = this.state.data;

    // 使用时间戳作为唯一的标识 key。实际中，生产环境里这个 id 通常由服务端生成
    comment.id = Date.now();
    let newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      type: 'POST',
      dataType: 'json',
      cache: false,
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, statur, err) {

        // 临时写成实时可见效果，但随着轮询的请求会被刷新替代
        this.setState({data: newComments});
        // this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState() {
    return {
      data: []
    };
  },
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render() {
    return (
      <div className="commentBox">
        <h1> Comments </h1>
        <hr/>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/demo1/api/comments.json" pollInterval={2000} />,
  document.getElementById('content')
);
