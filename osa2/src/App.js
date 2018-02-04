import React from 'react'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        countries: [],
        filter: ''
      }
    }

    componentDidMount() {
        axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            this.setState({ countries: response.data })
        })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    showCountry = (countryName) => {
        this.setState({ filter: countryName })
    }

    render() {
        const shownCountries = this.state.filter === '' ?
        this.state.countries :
        this.state.countries.filter(country => country.name.toLowerCase().indexOf(this.state.filter.toLowerCase()) >= 0);
        const country = shownCountries[0]

        return (
        <div>
          <div>
            find countries: <input value={this.state.filter} onChange={this.handleFilterChange} />
          </div>
          {shownCountries.length > 10 &&
            <p>Too many matches, please give a more specific filter</p>
          }
          {shownCountries.length <= 0 &&
            <p>No results found</p>
          }
          {shownCountries.length > 1 && shownCountries.length <= 10 &&
            <div>
                {shownCountries.map(country => <div key={country.name} onClick={() => this.showCountry(country.name)}>{country.name}</div>)}
            </div>
          }
          {shownCountries.length === 1 &&
            <div>
                <h2>{country.name} {country.nativeName}</h2>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h3>Languages</h3>
                {country.languages.map(lang => <div key={lang.name}>{lang.name} {lang.nativeName}</div>)}
                <img src={country.flag} height="256"></img>
            </div>
          }
        </div>
      )
    }
  }

export default App