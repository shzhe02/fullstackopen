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

const Total = ({parts}) => {
    return (
        <p><strong>total of {parts.map(e => e.exercises).reduce((a, b) => a + b)} exercises</strong></p>
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