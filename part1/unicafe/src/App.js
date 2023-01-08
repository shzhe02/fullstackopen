import { useState } from 'react'

const Button = (props) => <button onClick={props.handler}>{props.label}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1)
  const addNeutral = () => setNeutral(neutral + 1)
  const addBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={addGood} label="good" />
      <Button handler={addNeutral} label="neutral" />
      <Button handler={addBad} label="bad" />
      <h1>statictics</h1>
      <p>
        good {good}<br />
        neutral {neutral}<br />
        bad {bad}
      </p>
    </div>
  )
}

export default App