import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { showInfo, hide } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const state = this.props.store.getState()
    const anecdotes = state.anecdotes.filter(a => a.content.indexOf(state.filter) !== -1)
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
                this.props.store.dispatch(vote(anecdote.id))
                this.props.store.dispatch(showInfo('voted for "' + anecdote.content + '"'))
                setTimeout(() => this.props.store.dispatch(hide()), 5000)
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

export default AnecdoteList
