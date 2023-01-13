import CountryView from "./CountryView"

const CountryList = ({ search, countries, setSearch }) => {
  if (search === "") return
  const filtered = countries.filter((e) =>
    e.name.common.toLowerCase().includes(search.toLowerCase())
  )
  if (filtered.length === 1) {
    return <CountryView country={filtered[0]} />
  } else if (filtered.length > 10) {
    return <>Too many matches, specify another filter</>
  }
  return filtered.map((e) => (
    <li key={e.name.common}>
      {e.name.common}
      <button onClick={() => setSearch(e.name.common)}>show</button>
    </li>
  ))
}

export default CountryList
