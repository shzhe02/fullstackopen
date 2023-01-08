const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
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
