import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { info } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => doVote(anecdote, props)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const doVote = async (anecdote, props) => {
  props.vote(anecdote)
  props.info(`voted for ${anecdote.content}`, 5000)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(a => a.content.indexOf(state.filter) !== -1).sort((a, b) => b.votes - a.votes),
    filter: state.filter
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  { vote, info }
)(AnecdoteList)

export default ConnectedAnecdoteList
