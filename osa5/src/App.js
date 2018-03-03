import React from 'react';

const actionFor = {
  vote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  },
  create(anecdote) {
    return {
      type: 'NEW',
      data: { anecdote }
    }
  }
}

class App extends React.Component {
  vote = (id) => () => {
    this.props.store.dispatch(
      actionFor.vote(id)
    )
  }
  create = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.create(event.target.anecdote.value)
    )
  }
  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.create}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App