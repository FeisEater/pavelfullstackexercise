let timer

export const info = (msg, timeout) => {
  return async (dispatch) => {
    dispatch({ type: 'INFO', msg })
    clearTimeout(timer)
    timer = setTimeout(() => dispatch({ type: 'CLEAR' }), timeout)
  }
}

export const error = (msg, timeout) => {
  return async (dispatch) => {
    dispatch({ type: 'ERROR', msg })
    clearTimeout(timer)
    timer = setTimeout(() => dispatch({ type: 'CLEAR' }), timeout)
  }
}

export const localError = async (msg, timeout, dispatch) => {
  dispatch({ type: 'ERROR', msg })
  clearTimeout(timer)
  timer = setTimeout(() => dispatch({ type: 'CLEAR' }), timeout)
}

export const localInfo = async (msg, timeout, dispatch) => {
  dispatch({ type: 'INFO', msg })
  clearTimeout(timer)
  timer = setTimeout(() => dispatch({ type: 'CLEAR' }), timeout)
}

const reducer = (store = {msg: null, isError: false}, action) => {
  if (action.type === 'INFO') {
    return { msg: action.msg, isError: false }
  }
  if (action.type === 'ERROR') {
    return { msg: action.msg, isError: true }
  }
  if (action.type === 'CLEAR') {
    return { msg: null, isError: false }
  }
  return store
}

export default reducer