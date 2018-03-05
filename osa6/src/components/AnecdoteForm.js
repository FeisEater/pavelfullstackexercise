import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showInfo, hide } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(createAnecdote(content))
    this.props.store.dispatch(showInfo('Anecdote "' + content + '" added'))
    setTimeout(() => this.props.store.dispatch(hide()), 5000)

    e.target.anecdote.value = ''
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default AnecdoteForm
