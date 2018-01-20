import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            keski: 0,
            huono: 0
        }
    }
    
    annaPalaute = (palaute) => () => {
        const newState = {};
        newState[palaute] = this.state[palaute] + 1;
        this.setState(newState);
    }

    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <button onClick={this.annaPalaute('hyva')}>hyvä</button>
                <button onClick={this.annaPalaute('keski')}>en osaa sanoa</button>
                <button onClick={this.annaPalaute('huono')}>huono</button>
                <h1>statistiikka</h1>
                <p>hyvä {this.state.hyva}</p>
                <p>en osaa sanoa {this.state.keski}</p>
                <p>huono {this.state.huono}</p>
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

