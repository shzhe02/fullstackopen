import db from "../services/db"

const removeEntry = (entry, setPersons) => {
  return () => {
    if (window.confirm(`Delete ${entry.name}?`)) {
      db.remove(entry.id)
      db.fetch().then((data) => setPersons(data))
    }
  }
}

const Persons = ({ persons, searchkey, setPersons }) => {
  return (
    <>
      {persons
        .filter((entry) =>
          entry.name.toLowerCase().includes(searchkey.toLowerCase())
        )
        .map((entry) => (
          <li key={entry.name}>
            {entry.name} {entry.number}{" "}
            <button onClick={removeEntry(entry, setPersons)}>delete</button>
          </li>
        ))}
    </>
  )
}

export default Persons
