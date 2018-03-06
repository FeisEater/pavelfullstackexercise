let timer

export const info = (msg, timeout) => {
  return async (dispatch) => {
    dispatch({ type: 'INFO', msg })
    clearTimeout(timer)
    timer = setTimeout(() => dispatch({ type: 'INFO', msg: '' }), timeout)
  }
}

const reducer = (store = '', action) => {
  if (action.type === 'INFO') {
    return action.msg
  }
  return store
}

export default reducer