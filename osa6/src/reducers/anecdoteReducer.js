import anecdoteService from '../services/anecdotes'

export const createAnecdote = (data) => { return { type: 'CREATE', data } }
export const vote = (voted) => { return { type: 'VOTE', voted } }
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