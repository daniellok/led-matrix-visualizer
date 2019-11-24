const React = require('react');
const Led = require('./led.jsx');

function Input(props) {
  const input = props.type === 'number' ? (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      />
  ) : (
    <input
      type={props.type}
      name={props.name}
      min={props.min}
      max={props.max}
      value={props.value}
      onChange={props.onChange}
      />
  )
  return (
    <div className="inputWrapper">
      <span className="inputLabel">{props.name}</span>
      { input }
    </div>
  )
}

class Visualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width   : 30,
      height  : 5,
      size    : 16,
      spacing : 2,
    };

    this.handleWidthChange = this.handleWidthChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSpacingChange = this.handleSpacingChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  mapXYtoKey(x, y) {
    return (y * this.state.width) + x;
  }

  handleWidthChange(e) {
    const strVal = e.target.value;
    if (strVal === '') {
      this.setState({
	width: ''
      });
      return;
    }
    const val = parseInt(strVal, 10);
    if (!isNaN(val)) {
      this.setState({
	width: val
      });
    }
  }

  handleHeightChange(e) {
    const strVal = e.target.value;
    if (strVal === '') {
      this.setState({
	height: ''
      });
      return;
    }
    const val = parseInt(strVal, 10);
    if (!isNaN(val)) {
      this.setState({
	height: val
      });
    }
  }

  handleSizeChange(e) {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      this.setState({
	size: val
      });
    }
  }

  handleSpacingChange(e) {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      this.setState({
	spacing: val
      });
    }
  }

  toggle() {
    this.setState(state => ({
      toggle: !state.toggle
    }));
  }

  render() {
    const visualizer = this.state.width === '' || this.state.height === ''
	  ? null
	  : (
	    <div className="visualizer">
	      {[...Array(this.state.height).keys()].map(y => (
		<div className="ledRow" key={y}>
		  {[...Array(this.state.width).keys()].map(x => {
		    return (
		      <Led editActive={this.props.editActive}
			   margin={this.state.spacing}
			   key={JSON.stringify([x,y])}
			   size={this.state.size}
			   toggle={this.state.toggle}
			   />
		    );
		  })}
		</div>
	      ))}
            </div>)
    
    return (
      <div>
	<div className="controls">
	  <h2>Controls</h2>
	  <div className="controlsWrapper">
	    <Input
	      type="number"
	      name="Width"
	      value={this.state.width}
	      onChange={this.handleWidthChange} />
	    <Input
	      type="number"
	      name="Height"
	      value={this.state.height}
	      onChange={this.handleHeightChange} />
	    <Input
	      className="slider"
	      type="range"
	      name="Size"
	      min={4}
	      max={20}
	      value={this.state.size}
	      onChange={this.handleSizeChange} />
	    <Input
	      className="slider"
	      type="range"
	      name="Spacing"
	      min={0}
	      max={16}
	      value={this.state.spacing}
	      onChange={this.handleSpacingChange} />
	    <div className="buttonWrapper">
	      <button
		className="clearAll"
		onClick={this.toggle}>
		Clear All
	      </button>
	    </div>
	  </div>
	</div>
	{ visualizer }
      </div>
    )
  }
}

module.exports = Visualizer;
