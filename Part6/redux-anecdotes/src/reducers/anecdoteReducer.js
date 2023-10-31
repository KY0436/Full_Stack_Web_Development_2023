import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes.js'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    // Part 6.4 - Create the anecdote
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
    },
    // Part 6.3 - Vote Function
    vote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      ).sort((a, b) => b.votes - a.votes) // Part 6.5- Sort in the decreasing way
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    getAnecdote(state, action) {
      return action.payload
    }
  }
})

export const getAllAnecdotes = () => {
  return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(getAnecdote(anecdotes))
  }
}

export const newAnecdote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
}


export default anecdoteSlice.reducer
export const { createAnecdote, vote, appendAnecdote} = anecdoteSlice.actions