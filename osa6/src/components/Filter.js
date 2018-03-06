import React from 'react'
import { filter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={event => this.props.filter(event.target.value)}/>
      </div>
    )
  }
}

const ConnectedFilter = connect(
  null,
  { filter }
)(Filter)

export default ConnectedFilter