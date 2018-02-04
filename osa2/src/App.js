import React from 'react'
import PersonList from './components/Person'
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [],
        newName: '',
        newNumber: '',
        filter: ''
      }
    }

    componentDidMount() {
        personService
        .getAll()
        .then(response => {
            this.setState({ persons: response.data })
        })
    }

    addEntry = (event) => {
        event.preventDefault()
        
        if (this.state.persons.find(person => person.name === this.state.newName) !== undefined) {
            alert('Already added ' + this.state.newName);
            return;
        }

        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber,
        }
        
        personService
        .create(personObject)
        .then(response => {
            this.setState({
                persons: this.state.persons.concat(response.data),
                newName: '',
                newNumber: ''
            })
        })
    }

    handleNameChange = (event) => {
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        this.setState({ filter: event.target.value })
    }

    render() {
        return (
        <div>
          <h2>Puhelinluettelo</h2>
          <div>
            rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilterChange} />
          </div>
          <h2>Lisää uusi</h2>
          <form onSubmit={this.addEntry}>
            <div>
              nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
            </div>
            <div>
              numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
          <h2>Numerot</h2>
          <PersonList filter={this.state.filter} persons={this.state.persons} />
        </div>
      )
    }
  }

export default App