import React from 'react'

const Person = (props) => {
    return (
        <tr>
            <td>{props.person.name}</td>
            <td>{props.person.number}</td>
            <td><button onClick={() => props.removeFunc(props.person)}>Poista</button></td>
        </tr>
    )
}

const PersonList = (props) => {
    const shownPersons = props.filter === '' ?
    props.persons :
    props.persons.filter(person => person.name.toLowerCase().indexOf(props.filter.toLowerCase()) >= 0);

    return (
        <table><tbody>
            {shownPersons.map(person => <Person key={person.id} person={person} removeFunc={props.removeFunc} />)}
        </tbody></table>
    )
}

export default PersonList