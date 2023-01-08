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

const Content = ({parts}) => {
    return (
        parts.map(e => <li key={e.id}><Part part={e.name} exercises={e.exercises} /></li>)
    )
}

const Total = (props) => {
    let sum = 0
    props.parts.map(e => e.exercises).forEach(e => sum += e)
    return (
        <p><strong>total of {sum} exercises</strong></p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course