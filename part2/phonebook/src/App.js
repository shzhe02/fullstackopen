import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '2934876897436'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
  const handleNumber = (event) => (
    setNewNumber(event.target.value)
  )

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(name => <li key={name.name}>{name.name} {name.number}</li>)}
    </div>
  )
}

export default App
