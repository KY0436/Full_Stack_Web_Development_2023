import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// Get the URL
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Set up the token
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// Create the token
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('create run')
  return response.data
}

// Update the token
const update = (blogID, newTargetBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${blogID}`, newTargetBlog, config)
  return request.then(response => response.data)
}

// Delete the token
const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken, update, deleteBlog }