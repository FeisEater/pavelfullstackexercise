import anecdoteService from '../services/anecdotes'

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdoteService.createNew(content)
    dispatch({ type: 'CREATE', data })
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes += 1
    const voted = await anecdoteService.modify(anecdote)
    dispatch({ type: 'VOTE', voted })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch({ type: 'INIT_NOTES', data })
  }
}

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !== action.voted.id)

    return [...old, action.voted ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  }
  if (action.type === 'INIT_NOTES')
    return action.data

  return store
}

export default reducer