const Persons = ({ persons, entry, searchkey }) => {
  return ( 
    <>
      {
        persons
        .filter(entry => entry.name.toLowerCase().includes(searchkey.toLowerCase()))
        .map(entry => <li key={entry.name}>{entry.name} {entry.number}</li>)
      }
    </>
  )
}

export default Persons