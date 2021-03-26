import React from 'react'

const Persons = ({ filterPerson }) => {
    return (
        filterPerson.map((e, i) =>
            <tr key={i}>
                <td>{e.name}</td>
                <td>{e.number}</td>
            </tr>
        )
    )
}

export default Persons