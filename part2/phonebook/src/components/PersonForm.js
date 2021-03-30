import React from 'react'

const PersonForm = ({ addPerson, data }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input
                    value={data.newName}
                    onChange={data.handleNameChange}
                /><br />
                number: <input
                    value={data.newNumber}
                    onChange={data.handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm