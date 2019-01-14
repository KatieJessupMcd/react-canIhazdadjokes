import React, { Component } from 'react';

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = evt => {
    this.props.updateScore(this.props.action);
  };

  render() {
    return (
      <span onClick={this.handleClick}>
        <i
          className={`far fa-thumbs-${this.props.action} ml-3`}
          aria-label="Vote up"
        />
      </span>
    );
  }
}

export default Vote;
