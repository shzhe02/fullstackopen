import { useState } from 'react'

const Button = (props) => <button onClick={props.handler}>{props.label}</button>

const StatisticAverage = (props) => <tr><td>average</td> <td>{(props.good - props.bad) / props.total}</td></tr>

const StatisticPositive = (props) => <tr><td>positive</td><td>{(props.good / props.total) * 100} %</td></tr>

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Statistics = (props) => {
  if (props.total === 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.total}/>
      <StatisticAverage good={props.good} bad={props.bad} total={props.total} />
      <StatisticPositive good={props.good} bad={props.bad} total={props.total} />
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
      <h1>statictics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App