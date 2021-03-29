import React, { useState } from 'react'
import axios from 'axios'

const PersonForm = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const addPerson = (e) => {
        e.preventDefault()
        const personsArray = persons.map(e => e.name)
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (personsArray.includes(`${personObject.name}`)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            axios
                .post('http://localhost:3001/persons', personObject)
                .then(response => setPersons(persons.concat(response.data)))
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (e) => setNewName(e.target.value)
    const handleNumberChange = (e) => setNewNumber(e.target.value)

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                /><br />
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )

}

export default PersonForm