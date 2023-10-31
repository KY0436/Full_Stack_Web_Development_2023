import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer.js'
import { createNotification, deleteNotification } from '../reducers/notificationReducer.js'
import { setNotification } from '../reducers/notificationReducer.js'

const SingleAnecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
       </div>
    </div>
    
  )
}

const AnecdoteList = () => {

  const filterValue = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes).filter(
    anecdote => anecdote.content.includes(filterValue)
  )
  const dispatch = useDispatch()

  const voteFor = (id) => {
      const anecdote = anecdotes.filter(anecdote => anecdote.id === id)[0]
      dispatch(vote(anecdote.id))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }
  
  return (
    <div>
      {anecdotes.map(anecdote => 
        <SingleAnecdote key={anecdote.id} anecdote={anecdote}
          handleClick={() => {
            /*
            dispatch(vote(anecdote.id))
            dispatch(createNotification(`you voted "${anecdote.content}"`))
            setTimeout(() => {dispatch(deleteNotification())}, 5000)*/
            voteFor(anecdote.id)
          }}
        />
      )}
    </div>
  )

}

export default AnecdoteList