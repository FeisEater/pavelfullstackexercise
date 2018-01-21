import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    let votes = Array(anecdotes.length);
    votes.fill(0, 0, anecdotes.length);
    this.state = {
      selected: 0,
      votes: votes
    }
  }

  showRandomAnecdote = () => () => {
    let nextIdx = this.state.selected;
    while (nextIdx === this.state.selected)
        nextIdx = Math.floor(Math.random() * anecdotes.length);
    this.setState({selected: nextIdx});
  }

  voteAnecdote = () => () => {
      let votesCopy = this.state.votes.slice();
      votesCopy[this.state.selected] += 1;
      this.setState({votes: votesCopy});
  }

  bestAnecdoteIdx = () => {
    let idx = 0;
    let record = 0;
    this.state.votes.forEach((votes, i) => {
        if (votes > record) {
            idx = i;
            record = votes;
        }
    });
    return idx;
  }

  render() {
    const best = this.bestAnecdoteIdx();
    return (
      <div>
        <Anecdote anecdotes={this.props.anecdotes} state={this.state} idx={this.state.selected} />
        <button onClick={this.voteAnecdote()}>vote</button>
        <button onClick={this.showRandomAnecdote()}>next anecdote</button>
        <Anecdote anecdotes={this.props.anecdotes} state={this.state} idx={best} />
      </div>
    )
  }
}

const Anecdote = (props) => {
    return (
        <div>
            <p>{props.anecdotes[props.idx]}</p>
            <p>has {props.state.votes[props.idx]} votes</p>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
