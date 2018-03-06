export const createAnecdote = (data) => { return { type: 'CREATE', data } }
export const vote = (id) => { return { type: 'VOTE', id } }
export const anecdoteInitialization = (data) => { return { type: 'INIT_NOTES', data } }

const reducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    return [...store, action.data]
  }
  if (action.type === 'INIT_NOTES')
    return action.data

  return store
}

export default reducer