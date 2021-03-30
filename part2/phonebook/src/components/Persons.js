import React from 'react'
import personService from '../services/person'

const Persons = ({ filterPerson, setPersons, setMessage }) => {

    const isDelete = (person) => {
        const result = window.confirm(`Delete ${person.name}`)
        if (result) {
            personService
                .deletePerson(person.id)
                .then(response => {
                    setPersons(filterPerson.filter(item => item !== person))
                    setMessage({
                        text: `${person.name} has removed`,
                        type: "success",
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                })
                .catch((err) => {
                    setMessage({
                        text: `${person.name} was already removed from server`,
                        type: "error",
                    })
                    setTimeout(() => {
                        setMessage(null)
                    }, 3000)
                })
        }
    }

    return (
        filterPerson.map((e) =>
            <p>
                {e.name}
                {" "}
                {e.number}
                {" "}
                <button onClick={() => isDelete(e)}>delete</button>
            </p>
        )
    )
}

export default Persons