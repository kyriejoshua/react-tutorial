// tutorial1.js 基本使用
// let CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//         Hello, world! I am a CommentBox.
//       </div>
//     );
//   }
// });
//
// ReactDOM.render(
//   <CommentBox />,
//   document.getElementById('content')
// );

// tutorial1-raw.js 效果与上等同，编译成 js 的效果
// let CommentBox = React.createClass({
//   render: function() {
//     return (
//       React.createElement(
//         'div',
//         {
//           className: 'commentBox'
//         },
//         'Hello, world! I am a CommentBox.'
//       )
//     )
//   }
// });

// ReactDOM.render(
//   React.createElement(CommentBox, null),
//   document.getElementById('content')
// )

// tutorial2.js
// const CommentList = React.createClass({
//   render: function() {
//     return (
//       <div className="commentList">
//         Hello, world! I am a CommentList.
//       </div>
//     );
//   }
// });

// const CommentForm = React.createClass({
//   render: function() {
//     return (
//       <div className="commentForm">
//          Hello, world! I am a CommentForm.
//       </div>
//     );
//   }
// });

// tutorial3.js
// const CommentBox = React.createClass({
//   render: function() {
//     return (
//       <div className="commentBox">
//         <h1> Comments </h1>
//         <CommentList />
//         <CommentForm />
//       </div>
//     )
//   }
// });


// tutorial4.js
// const Comment = React.createClass({
//   render() {
//     return (
//       <div className="comment">
//         <h2 className="commentAuthor">
//           {this.props.author}
//         </h2>
//         {this.props.children}
//       </div>
//     )
//   }
// });

// tutorial5.js
// const CommentList = React.createClass({
//   render() {
//     return (
//       <div className="commentList">
//         <Comment author="Pete Hunt"> This is a comment. </Comment>
//         <Comment author="Jordan Walk"> This is *anothor* comment. </Comment>
//       </div>
//     )
//   }
// });

// tutorial6.js 添加 markdown, 已引入相应第三方库，直接调用 remarkable 库
// const Comment = React.createClass({
//   render() {
//     const md = new Remarkable();
//     return (
//       <div className="comment">
//         <h2 className="commentAuthor">
//           {this.props.author}
//         </h2>
//         {md.render(this.props.children.toString())}
//       </div>
//     )
//   }
// });

// tutorial7.js 6中的效果显示为原生 HTML 标签，因 React 免收 XSS 攻击的保护，以下方法可以解决该问题，但框架并不推荐使用
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

// ReactDOM.render(
//   <CommentBox />,
//   document.getElementById('content')
// )

// tutorial8.js 挂钩数据模型，mock 一些数据
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

// tutorial9.js 使用模块化的方式传入该数据
// const CommentBox = React.createClass({
//   render() {
//     return (
//       <div className="commentBox">
//         <h1> Comments </h1>
//         <CommentList data={this.props.data} />
//         <CommentForm />
//       </div>
//     );
//   }
// });

// tutorial10.js 动态渲染数据
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

// ReactDOM.render(
//   <CommentBox data={data} />,
//   document.getElementById('content')
// );


// tutorial12.js 可变的状态 定义组件的初始状态
// const CommentBox = React.createClass({
//   getInitialState() {
//     return {
//       data: []
//     }
//   },
//   render() {
//     return (
//       <div className="commentBox">
//         <h1> Comments </h1>
//         <CommentList data={this.state.data} />
//         <CommentForm />
//       </div>
//     );
//   }
// });

// tutorial13.js 更新状态，本地获取
const CommentBox = React.createClass({
  getInitialState() {
    return {
      data: []
    }
  },
  componentDidMount() {
    $.ajax({
      url: this.props.url,
      type: 'GET',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data})
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render() {
    return (
      <div className="commentBox">
        <h1> Comments </h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    )
  }
});

// tutorial15.js
const CommentForm = React.createClass({
  render() {
    return (
      <form className="commentForm">
        <input type="text" placeholder="Your name" />
        <br/><br/>
        <input type="text" placeholder="Say something..." />
        <br/><br/>
        <input type="submit" value="Post" />
      </form>
    );
  }
});

// ReactDOM.render(
//   <CommentBox data={data} />,
//   document.getElementById('content')
// );

// tutorial11.js 从本地服务器获取相应数据
ReactDOM.render(
  <CommentBox url="/api/comments.json" />,
  document.getElementById('content')
);
