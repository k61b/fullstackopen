import React, { useState } from 'react'
import personService from '../services/person'

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
            const oldPerson = persons.filter(e => e.name === newName)
            const _id = oldPerson.map(e => e.id)[0]
            const result = window.confirm(
                `${newName} is already added to phonebook, replace the old number with a new one?
                `)
            if (result) {
                personService
                    .update(_id, personObject)
                    .then(returnedPerson => {
                        const newPersons = persons.map(person =>
                            person.id !== returnedPerson.id ? person : returnedPerson
                        )
                        setPersons(newPersons)
                    })
            }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
            setNewName('')
            setNewNumber('')
        }
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