export const showInfo = (msg) => { return { type: 'INFO', msg } }
export const hide = () => { return { type: 'INFO', msg: '' } }

const reducer = (store = '', action) => {
  if (action.type === 'INFO') {
    return action.msg
  }
  return store
}

export default reducer