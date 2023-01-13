import { useState, useEffect } from "react"
import axios from "axios"

import CountryList from "./components/CountryList"

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
        search={search}
        countries={countries}
        setSearch={setSearch}
      />
    </div>
  )
}

export default App
