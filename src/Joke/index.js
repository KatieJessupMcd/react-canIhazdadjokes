import React, { Component } from 'react';
import Vote from '../Vote';

class Joke extends Component {
  updateScore = action => {
    this.props.updateScore(this.props.id, action);
  };

  render() {
    return (
      <div className="d-flex justify-content-between">
        <span>{this.props.text}</span>
        <div>
          <Vote action="up" updateScore={this.updateScore} />
          <Vote action="down" updateScore={this.updateScore} />
          <span className="ml-4">{this.props.score}</span>
        </div>
      </div>
    );
  }
}

export default Joke;
