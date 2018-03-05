export const filter = (filter) => { return { type: 'FILTER', filter } }

const reducer = (store = '', action) => {
  if (action.type === 'FILTER') {
    return action.filter
  }
  return store
}

export default reducer