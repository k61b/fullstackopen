import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  const [filter, setFilter] = useState('')
  const [filterPersons, setFilterPersons] = useState(persons)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  // Filter
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setFilterPersons(persons.filter((person) =>
      (person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)))
  }

  // Add Person
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
        setMessage(
          `Edited ${personObject.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      setMessage(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const addPersonData = {
    newName,
    newNumber,
    handleNameChange,
    handleNumberChange
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} data={addPersonData} />
      <h2>Numbers</h2>
      {filter === '' ?
        <Persons filterPerson={persons} setPersons={setPersons} />
        :
        <Persons filterPerson={filterPersons} setPersons={setPersons} />
      }
    </div>
  )
}

export default App