import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])

  const [filter, setFilter] = useState('')
  const [filterCountries, setFilterCountries] = useState(countries)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setFilterCountries(countries.filter((country) =>
      (country.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)))
  }

  return (
    <div>
      <div>
        filter shown with <input onChange={handleFilterChange} value={filter}></input>
      </div>
      {filterCountries.length <= 10 ?
        filterCountries.length === 1 ?
          filterCountries.map(e => {
            return (
              <>
                <h1>{e.name}</h1>
                <p>capital {e.capital}</p>
                <p>population {e.population}</p>
                <h3>languages</h3>
                <ul>
                  {e.languages.map((leng, i) => <li key={i}>{leng.name}</li>)}
                </ul>
                <img style={{ width: 100 }} src={e.flag} alt="country flag" />
              </>
            )
          })
          :
          filterCountries.map(e => <p>{e.name}</p>)
        :
        <p>Too many matches, specify another filter</p>
      }
    </div>
  )
}

export default App