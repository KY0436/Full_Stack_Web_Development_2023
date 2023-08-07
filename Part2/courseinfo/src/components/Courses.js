const Header = ({props}) => {
  return(
    <h1>{props}</h1>
  )
}

const Part = ({part}) => {
  return (
    <li>
      {part.name} {part.exercises}
    </li>
  )
}

const Content = ({props}) => (
  <ul>
    {props.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </ul>
)


const Total = ({props}) => {

  const total = props.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  )
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Course = ({props}) => {
  return (
    <div>
      <Header props={props.name} />
      <Content props={props.parts} />
      <Total props={props.parts} />
    </div>
  )
}

const Courses = ({courses}) => {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} props={course} />
      ))}
    </div>
  )
}

export default Courses;