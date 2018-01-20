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
                <button onClick={this.annaPalaute('hyva')}>hyvä</button>
                <button onClick={this.annaPalaute('keski')}>en osaa sanoa</button>
                <button onClick={this.annaPalaute('huono')}>huono</button>
                <h1>statistiikka</h1>
                <p>hyvä {this.state.hyva}</p>
                <p>en osaa sanoa {this.state.keski}</p>
                <p>huono {this.state.huono}</p>
                <p>keskiarvo {this.keskiarvo()}</p>
                <p>positiivisia {this.positiivisia()}</p>
            </div>
        )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

