import React, { Component } from 'react';
import axios from 'axios';
import Joke from '../Joke';

class JokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      error: false,
      page: 1
    };
  }
  updateJokes = async () => {
    try {
      const list = await axios.get(
        `https://icanhazdadjoke.com/search?limit=10&page=${this.state.page}`,
        {
          headers: { Accept: 'application/json' }
        }
      );

      this.setState(
        {
          page: this.state.page + 1,
          jokes: list.data.results.map(joke => ({
            ...joke,
            score: 0
          }))
        },
        () => console.log(this.state.jokes)
      );
    } catch (error) {
      this.setState({
        error: true
      });
    }
  };

  updateScore = (id, action) => {
    // find joke in the list
    let jokeIdx = this.state.jokes.findIndex(j => j.id === id);
    // find joke to update
    let jokeItem = this.state.jokes.find(j => j.id === id);

    // increment/decrement score
    if (action === 'up') {
      jokeItem.score += 1;
    } else {
      jokeItem.score -= 1;
    }

    // use the jokeIdx to repopulate the joke list with the updated joke score
    this.setState(
      {
        jokes: [
          ...this.state.jokes.slice(0, jokeIdx),
          jokeItem,
          ...this.state.jokes.slice(jokeIdx + 1)
        ]
      },
      () => console.log(this.state.jokes)
    );
  };

  async componentDidMount() {
    this.updateJokes();
  }

  render() {
    let response;

    if (!this.state.jokes.length) {
      response = <p className="lead">Loading...</p>;
    } else {
      response = (
        <React.Fragment>
          <ul className="list-group">
            {this.state.jokes
              // sort needs to go first?
              .sort((a, b) => (b.score > a.score ? 1 : -1))
              .map(j => (
                <li key={j.id} className="list-group-item">
                  <Joke
                    id={j.id}
                    text={j.joke}
                    score={j.score}
                    updateScore={this.updateScore}
                  />
                </li>
              ))}
          </ul>
          <button onClick={this.updateJokes}> Can I haz more jokes plz</button>
        </React.Fragment>
      );
    }
    return response;
  }
}

export default JokeList;
