import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './reducer'
import {createStore} from 'redux'

const store = createStore(reducer)

class App extends React.Component {
    
    palautteetSumma = (state) => state.good + state.ok + state.bad;

    keskiarvo = (state) => {
        if (this.palautteetSumma(state) === 0)
            return 0.0;
        const arvo = (state.good - state.bad) / this.palautteetSumma(state);
        return Math.round(arvo * 10) / 10;
    }

    positiivisia = (state) => {
        if (this.palautteetSumma(state) === 0)
            return 0.0;
        let arvo = (state.good * 100) / this.palautteetSumma(state);
        arvo = Math.round(arvo * 10) / 10;
        return arvo + '%';
    }

    render() {
        const state = store.getState()
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button funktio={e => store.dispatch({ type: 'GOOD'})} palaute='hyvä' />
                <Button funktio={e => store.dispatch({ type: 'OK'})} palaute='en osaa sanoa' />
                <Button funktio={e => store.dispatch({ type: 'BAD'})} palaute='huono' />
                <h1>statistiikka</h1>
                <Statistics state={state} keskiarvo={this.keskiarvo(state)} positiivisia={this.positiivisia(state)} />
            </div>
        )
    }
}

const Button = (props) => {
    return (
        <button onClick={props.funktio}>
            {props.palaute}
        </button>
    )
}

const Statistics = (props) => {
    if (props.state.hyva + props.state.keski + props.state.huono === 0) {
        return (
            <p>ei yhtään palautteita annettu</p>
        )
    }
    return (
        <table>
            <tbody>
                <Statistic nimi='hyvä' arvo={props.state.good} />
                <Statistic nimi='en osaa sanoa' arvo={props.state.ok} />
                <Statistic nimi='huono' arvo={props.state.bad} />
                <Statistic nimi='keskiarvo' arvo={props.keskiarvo} />
                <Statistic nimi='positiivisia' arvo={props.positiivisia} />
            </tbody>
        </table>
    )
}

const Statistic = (props) => {
    return (
        <tr>
            <td>{props.nimi}</td>
            <td>{props.arvo}</td>
        </tr>
    )
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
store.subscribe(render)