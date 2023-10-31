import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notefications',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    deleteNotification(state, action) {
      return ''
    }
  }
})
export const { createNotification, deleteNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, time*1000) // Part 6.19, which demands to use actual 5 seconds.
  }
}



export default notificationSlice.reducer
