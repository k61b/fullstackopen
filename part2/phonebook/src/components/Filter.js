import React from 'react'

const Filter = ({ onChange, value }) => {
    return (
        <div>
            filter shown with <input onChange={onChange} value={value}></input>
        </div>
    )
}

export default Filter