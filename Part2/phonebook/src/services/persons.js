import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

//const getAll = () => axios.get(baseUrl)

//const create = (newObject) => axios.post(baseUrl, newObject);

// Get all the elements in the baseUrl
const getAll = () => {
  return axios.get(baseUrl)
}

// Function for adding a new element in the baseUrl
const create = newObject => {
  return axios.post(baseUrl, newObject)
}

// Function for updating the existent element in the baseUrl
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
}

// Function for deleting
const deleteData = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
}

export default {
  getAll: getAll,
  create: create,
  deleteData: deleteData,
  update: update,
}