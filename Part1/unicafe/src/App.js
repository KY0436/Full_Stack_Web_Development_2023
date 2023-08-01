import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  //  Display the statistics in the HTML table
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({goodNumber, neutralNumber, badNumber}) => {

  // Define three variables
  const all= goodNumber + neutralNumber + badNumber
  const average = (goodNumber - badNumber) / (goodNumber + neutralNumber + badNumber)
  const positive = (100 * goodNumber)/(badNumber + neutralNumber + goodNumber)+"%"

  /// No displays when there are no clicks happened
  if ((all) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return(
    <div>
    <table>
      <tbody>
        <tr><StatisticLine text='good' value={goodNumber}/></tr>
        <tr><StatisticLine text='neutral' value={neutralNumber}/></tr>
        <tr><StatisticLine text='bad' value={badNumber}/></tr>
        <tr><StatisticLine text='all' value={all}/></tr>
        <tr><StatisticLine text='average' value={average}/></tr>
        <tr><StatisticLine text='positive' value={positive}/></tr>
      </tbody>
    </table>

    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // Handler for counting the "Good"
  const increaseGood = () => {
    setGood(good + 1)
  }

  // Handler for counting the "Neutral"
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  // Handler for counting the "Bad"
  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={increaseGood} text="good"/>
      <Button handleClick={increaseNeutral} text="neutral" />
      <Button handleClick={increaseBad} text="bad" />
      <h1>stastics</h1>
      <Statistics goodNumber={good} neutralNumber={neutral} badNumber={bad}/>

    </div>
  )
} 

export default App