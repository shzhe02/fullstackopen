const Header = (props) => {
  // console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Content = (props) => {
  const [one, two, three] = props.parts
  return (
    <div>
      <Part part={one.name} exercises={one.exercises} />
      <Part part={two.name} exercises={two.exercises} />
      <Part part={three.name} exercises={three.exercises} />
    </div>
  )
}

const Total = (props) => {
  let sum = 0
  props.parts.map(e => e.exercises).forEach(e => sum += e)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App