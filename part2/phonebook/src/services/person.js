import axios from 'axios'
const baseUrl = 'https://strawberry-sundae-69376.herokuapp.com/api/persons'

console.log(baseUrl)
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => console.log(response))
}

export default {
    getAll,
    create,
    update,
    deletePerson
}