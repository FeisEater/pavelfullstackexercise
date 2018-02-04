import React from 'react'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [
          { name: 'Arto Hellas', number: '0800123123', id: 0 }
        ],
        newName: '',
        newNumber: ''
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
      
    render() {
      return (
        <div>
          <h2>Puhelinluettelo</h2>
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
          <table><tbody>
              {this.state.persons.map(person => <Person key={person.id} person={person} />)}
          </tbody></table>
        </div>
      )
    }
  }

const Person = (props) => {
    return (
        <tr>
            <td>{props.person.name}</td>
            <td>{props.person.number}</td>
        </tr>
    )
}

export default App