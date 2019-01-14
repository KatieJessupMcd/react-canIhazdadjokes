import React, { Component } from 'react';

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  handleMouseEnter = evt => {
    this.setState({ hover: true });
  };

  handleMouseLeave = evt => {
    this.setState({ hover: false });
  };

  handleClick = evt => {
    this.props.updateScore(this.props.action);
  };

  render() {
    return (
      <span
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
      >
        <i
          className={`fa${this.state.hover ? 's' : 'r'} fa-thumbs-${
            this.props.action
          } ml-3`}
          aria-label="Vote up"
        />
      </span>
    );
  }
}

export default Vote;
