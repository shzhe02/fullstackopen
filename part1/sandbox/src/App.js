const Hello = ({name, age}) => {
  
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>Hello {name}, you are {age} years old.</p>
      <p>So, you were probably born in {bornYear()}.</p>
    </div>
  )
}

const App = () => {
  const name= "Kiera"
  const age = 25
  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Aether" age={15+32} />
      <Hello name={name} age={age}/>
    </>
  )
}

export default App;
