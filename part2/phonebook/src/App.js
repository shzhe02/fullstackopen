import { useState, useEffect } from "react"

import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import db from "./services/db"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchkey, setSearchkey] = useState("")

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
      db.add(nameObject).then((response) => console.log(response))
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
    } else {
      alert(`${newName} has already been added to the phonebook.`)
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
