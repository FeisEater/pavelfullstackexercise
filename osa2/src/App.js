import React from 'react'
import PersonList from './components/Person'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [
            { name: 'Arto Hellas', number: '040-123456', id: 0 },
            { name: 'Martti Tienari', number: '040-123456', id: 1 },
            { name: 'Arto Järvinen', number: '040-123456', id: 2 },
            { name: 'Lea Kutvonen', number: '040-123456', id: 3 }        ],
        newName: '',
        newNumber: '',
        filter: ''
      }
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
            id: this.state.persons.length
        }
        
        const persons = this.state.persons.concat(personObject)
        
        this.setState({
            persons,
            newName: '',
            newNumber: ''
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