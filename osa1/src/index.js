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

    palautteetSumma = () => this.state.hyva + this.state.keski + this.state.huono;

    keskiarvo = () => {
        if (this.palautteetSumma() === 0)
            return 0.0;
        const arvo = (this.state.hyva - this.state.huono) / this.palautteetSumma();
        return Math.round(arvo * 10) / 10;
    }

    positiivisia = () => {
        if (this.palautteetSumma() === 0)
            return 0.0;
        let arvo = (this.state.hyva * 100) / this.palautteetSumma();
        arvo = Math.round(arvo * 10) / 10;
        return arvo + '%';
    }

    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button funktio={this.annaPalaute('hyva')} palaute='hyvä' />
                <Button funktio={this.annaPalaute('keski')} palaute='en osaa sanoa' />
                <Button funktio={this.annaPalaute('huono')} palaute='huono' />
                <h1>statistiikka</h1>
                <Statistics state={this.state} keskiarvo={this.keskiarvo()} positiivisia={this.positiivisia()} />
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
        <div>
            <Statistic nimi='hyvä' arvo={props.state.hyva} />
            <Statistic nimi='en osaa sanoa' arvo={props.state.keski} />
            <Statistic nimi='huono' arvo={props.state.huono} />
            <Statistic nimi='keskiarvo' arvo={props.keskiarvo} />
            <Statistic nimi='positiivisia' arvo={props.positiivisia} />
        </div>
    )
}

const Statistic = (props) => {
    return (
        <p>{props.nimi} {props.arvo}</p>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

