require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(cors())

morgan.token('post', (request, response) => {
    if (request.method === 'POST')
        return JSON.stringify(request.body)
    else
        return ''
})

morgan.format('postFormat', ':method :url :status :res[content-length] - :response-time ms :post')

app.use(morgan('postFormat'))

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date}</p>
        `)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'name or number missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on ${PORT}`)