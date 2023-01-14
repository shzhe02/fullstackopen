import db from "../services/db"

const removeEntry = (entry, setPersons, setNotifMessage, setError) => {
  return () => {
    if (window.confirm(`Delete ${entry.name}?`)) {
      db.remove(entry.id)
        .then(() => {
          setNotifMessage(`${entry.name}'s entry has been removed.`)
          setError(false)
          setTimeout(() => {
            setNotifMessage("")
          }, 5000)
        })
        .catch(() => {
          setNotifMessage(
            `${entry.name}'s entry has already been removed from the server.`
          )
          setError(true)
          setTimeout(() => {
            setNotifMessage("")
          }, 5000)
        })
      db.fetch().then((data) => setPersons(data))
    }
  }
}

const Persons = ({
  persons,
  searchkey,
  setPersons,
  setNotifMessage,
  setError,
}) => {
  return (
    <>
      {persons
        .filter((entry) =>
          entry.name.toLowerCase().includes(searchkey.toLowerCase())
        )
        .map((entry) => (
          <li key={entry.name}>
            {entry.name} {entry.number}{" "}
            <button
              onClick={removeEntry(
                entry,
                setPersons,
                setNotifMessage,
                setError
              )}
            >
              delete
            </button>
          </li>
        ))}
    </>
  )
}

export default Persons
