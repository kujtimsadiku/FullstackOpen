import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const url = `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`

  useEffect(() => {
    if (name) {
      axios.get(url).then(response => {
        setCountry([{...response.data, found: true}])
      })
      .catch(e => {
        console.log(`Error at fetching ${name}`, e);
        setCountry([name, {found: false}]);
      })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  
  if (!country[0].found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const countryData = {
    name: country[0].name.common,
    capital: country[0].capital[0],
    population: country[0].population,
    flag: country[0].flags.svg,
  }

  return (
    <div>
      <h3>{countryData.name} </h3>
      <div>capital {countryData.capital} </div>
      <div>population {countryData.population}</div> 
      <img src={countryData.flag} height='100' alt={`flag of ${countryData.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App