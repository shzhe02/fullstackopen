import { useState } from 'react'

const Button = (props) => <button onClick={props.handler}>{props.label}</button>

const Average = (props) => (props.good - props.bad) / props.total

const Positive = (props) => (props.good / props.total) * 100

const Statistics = (props) => {
  return (
    <>
      <h1>statictics</h1>
      <p>
        good {props.good}<br />
        neutral {props.neutral}<br />
        bad {props.bad}<br />
        all {props.total}<br />
        average <Average good={props.good} bad={props.bad} total={props.total} /><br />
        positive <Positive good={props.good} bad={props.bad} total={props.total} />%
      </p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const addGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  }
  const addNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  const addBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handler={addGood} label="good" />
      <Button handler={addNeutral} label="neutral" />
      <Button handler={addBad} label="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App