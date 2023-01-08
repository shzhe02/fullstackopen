import { useState } from 'react'

const Button = (props) => <button onClick={props.handler}>{props.label}</button>

const StatisticAverage = (props) => <>average {(props.good - props.bad) / props.total}<br /></>

const StatisticPositive = (props) => <>positive {(props.good / props.total) * 100} %</>

const StatisticLine = (props) => <>{props.text} {props.value}<br /></>

const Statistics = (props) => {
  if (props.total === 0) {
    return (<p>No feedback given</p>)
  }
  return (
    <>
      <h1>statictics</h1>
      <p>
        <StatisticLine text="good" value={props.good}/>
        <StatisticLine text="neutral" value={props.neutral}/>
        <StatisticLine text="bad" value={props.bad}/>
        <StatisticLine text="all" value={props.all}/>
        <StatisticAverage good={props.good} bad={props.bad} total={props.total} />
        <StatisticPositive good={props.good} bad={props.bad} total={props.total} />
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