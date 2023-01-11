import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName
    }
    const alreadyExists = persons
        .map(e => e.name === newName)
        .reduce((collect, b) => collect || b)
    if (!alreadyExists) {
        setPersons(persons.concat(nameObject))
        setNewName("")
    } else {
        alert(`${newName} has already been added to the phonebook.`)
    }
    
    
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(name => <li key={name.name}>{name.name}</li>)}
    </div>
  )
}

export default App
