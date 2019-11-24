const React = require('react');
const Visualizer = require('./Visualizer.jsx');

import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editActive : false,
    };

    this.activateEditMode = this.activateEditMode.bind(this);
    this.deactivateEditMode = this.deactivateEditMode.bind(this);
  }

  activateEditMode(e) {
    this.setState(state => ({
      editActive : true,
    }));
  }

  deactivateEditMode(e) {
    this.setState(state => ({
      editActive : false,
    }));
  }

  render() {
    return (
      <div
	className="appContainer"
	onMouseDown={this.activateEditMode}
	onMouseUp={this.deactivateEditMode}>
	<h1>LED Matrix Visualizer</h1>
	<Visualizer editActive={this.state.editActive} />
      </div>
    )
  }
}

const container = document.getElementById('app');
ReactDOM.render(<App />, container);
