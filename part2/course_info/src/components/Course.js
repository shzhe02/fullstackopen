const Header = (props) => {
    // console.log(props)
    return (
        <h2>{props.course}</h2>
    )
}

const Part = (props) => {
    return (
        <p>{props.part} {props.exercises}</p>
    )
}

const Content = ({parts}) => {
    return (
        parts.map(e => <div key={e.id}><Part part={e.name} exercises={e.exercises} /></div>)
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