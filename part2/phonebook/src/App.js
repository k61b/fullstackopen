import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])

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

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setFilterPersons(persons.filter((person) =>
      (person.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
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