import { useState, useEffect } from "react"

import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import db from "./services/db"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchkey, setSearchkey] = useState("")
  const [notifMessage, setNotifMessage] = useState("")
  const [isError, setError] = useState(false)

  useEffect(() => {
    db.fetch().then((persons) => setPersons(persons))
  }, [])

  const addEntry = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    const alreadyExists = persons
      .map((e) => e.name === newName)
      .reduce((collect, b) => collect || b)
    if (!alreadyExists) {
      db.add(nameObject).then((data) => setPersons(persons.concat(data)))
      setNotifMessage(`Added ${newName}`)
      setError(false)
      setTimeout(() => setNotifMessage(""), 5000)
      setNewName("")
      setNewNumber("")
    } else {
      // alert(`${newName} has already been added to the phonebook.`)
      if (
        window.confirm(
          `${newName} is already in the phonebook. Replace the old number with a new one?`
        )
      ) {
        const id = persons.find((e) => e.name === newName).id
        db.update(nameObject, id)
        db.fetch().then((data) => setPersons(data))
        setNotifMessage(`${newName}'s number has been updated`)
        setError(false)
        setTimeout(() => setNotifMessage(""), 5000)
        setNewName("")
        setNewNumber("")
      }
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchkey = (event) => {
    setSearchkey(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} error={isError} />
      <Filter searchkey={searchkey} handleSearchkey={handleSearchkey} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addEntry={addEntry}
        handleName={handleName}
        handleNumber={handleNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchkey={searchkey}
        setPersons={setPersons}
      />
    </div>
  )
}

export default App
