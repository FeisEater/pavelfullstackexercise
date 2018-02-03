import React from 'react'

class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        persons: [
          { name: 'Arto Hellas', id: 0 }
        ],
        newName: ''
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
            id: this.state.persons.length
        }
        
        const persons = this.state.persons.concat(personObject)
        
        this.setState({
            persons,
            newName: ''
        })
    }

    handleChange = (event) => {
        this.setState({ newName: event.target.value })
    }
      
    render() {
      return (
        <div>
          <h2>Puhelinluettelo</h2>
          <form onSubmit={this.addEntry}>
            <div>
              nimi: <input value={this.state.newName} onChange={this.handleChange} />
            </div>
            <div>
              <button type="submit">lisää</button>
            </div>
          </form>
          <h2>Numerot</h2>
          <div>
              {this.state.persons.map(person => <Person key={person.id} person={person} />)}
          </div>
        </div>
      )
    }
  }

const Person = (props) => {
    return (
        <div>
            {props.person.name}
        </div>
    )
}

export default App