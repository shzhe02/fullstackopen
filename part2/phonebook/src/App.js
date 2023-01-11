import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchkey, setSearchkey] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber
    }
    const alreadyExists = persons
      .map(e => e.name === newName)
      .reduce((collect, b) => collect || b)
    if (!alreadyExists) {
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
        <div>
          filter shown with <input value={searchkey} onChange={handleSearchkey}/>
        </div>
      <h2>add a new</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons
          .filter(entry => entry.name.toLowerCase().includes(searchkey.toLowerCase()))
          .map(entry => <li key={entry.name}>{entry.name} {entry.number}</li>)
      }
    </div>
  )
}

export default App
