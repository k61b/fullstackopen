import axios from 'axios'
import decode from 'jwt-decode'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getUserInfo = () => {
  return token ? decode(token) : false
}

const getAllUsers = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get('/api/users', config)
  return request.then((response) => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(
    `${baseUrl}/${blog.id}`,
    { likes: blog.likes },
    config
  )
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

const newComment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return request.data
}

export default {
  getAll,
  create,
  setToken,
  update,
  remove,
  getAllUsers,
  getUserInfo,
  newComment,
}
