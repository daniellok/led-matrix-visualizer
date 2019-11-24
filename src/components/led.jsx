const React = require('react');

class Led extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  componentDidUpdate(oldProps, _) {
    if (!this.state.active) {
      return;
    }
    if (oldProps.toggle !== this.props.toggle) {
      this.setState(state => ({
	active: false
      }))
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.active !== this.state.active) {
      return true;
    } else if ((nextProps.toggle !== this.props.toggle)
	       && !this.state.active) {
      return false;
    }

    return true;
  }

  handleMouseEnter(e) {
    e.preventDefault();
    if (this.props.editActive) {
      this.setState(state => ({
	active: !state.active
      }));
    }
  }

  handleMouseDown(e) {
    e.preventDefault();
    this.setState(state => ({
      active: !state.active
    }));
  }

  render() {
    const className = this.state.active
      ? "ledActive"
      : "ledInactive";
    return  (
      <div
	className={className}
	onMouseDown={this.handleMouseDown}
	onMouseEnter={this.handleMouseEnter}
	style={{
	  width: this.props.size,
	  height: this.props.size,
	  margin: this.props.margin,
	}}>
	<div className={"innerLight"} />
      </div>
    )
  }
}

module.exports = Led;
