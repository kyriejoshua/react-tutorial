// react.js => React
// react-redux => ReactRedux
// redux => Redux
class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      content: '😆'
    }
  }
  
  handleClick() {
    let content = this.state.content === '😆' ? '🤣' : '😆';
    this.setState({
      content: content
    }); 
  }

  render() {
    console.log(ReactRedux)
    console.info(Redux)
    return (
      <div className="modal">
        <button className="modal-btn" onClick={this.handleClick.bind(this)}>Click Me</button>
        <div className="text">{this.state.content}</div>
      </div>
    )
  }
}


ReactDOM.render(
  <Modal/>,
  document.querySelector('#content')
)
