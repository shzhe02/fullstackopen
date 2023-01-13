import { useState, useEffect } from "react"
import axios from "axios"

const CountryView = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      capital {country.capital} <br />
      area {country.area} <br />
      <h4>languages</h4>
      <ul>
        {Object.values(country.languages).map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
    </>
  )
}

const CountryList = ({ searchkey, countryList, setSearch }) => {
  const filtered = countryList.filter((e) =>
    e.name.common.toLowerCase().includes(searchkey.toLowerCase())
  )
  let list = <></>

  if (searchkey === "") {
  } else if (filtered.length > 10) {
    list = <>Too many matches, specify another filter</>
  } else if (filtered.length === 1) {
    const country = filtered[0]
    list = <CountryView country={country} />
  } else {
    list = filtered.map((e) => (
      <li key={e.name.common}>
        {e.name.common}{" "}
        <button onClick={() => setSearch(e.name.common)}>show</button>
      </li>
    ))
  }
  return list
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries
      <input onChange={handleSearch} value={search} /> <br />
      <CountryList
        countryList={countries}
        searchkey={search}
        setSearch={setSearch}
      />
    </div>
  )
}

export default App
