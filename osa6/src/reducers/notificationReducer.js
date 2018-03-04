const reducer = (store = 'hey hey heyyy', action) => {
  if (action.type === 'INFO') {
    return action.msg
  }
  return store
}

export default reducer