import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showInfo, hide } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.anecdotes.filter(a => a.content.indexOf(this.props.filter) !== -1)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.vote(anecdote.id)
                this.props.showInfo('voted for "' + anecdote.content + '"')
                setTimeout(() => this.props.hide(), 5000)
              }}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { vote, showInfo, hide }
)(AnecdoteList)

export default ConnectedAnecdoteList
