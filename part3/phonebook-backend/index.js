const { application } = require("express")
const express = require("express")
const app = express()

app.use(express.json())

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

app.get("/api/persons", (request, response) => {
  response.json(data)
})

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${data.length} people</p><p>${new Date()}<p>`
  )
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const entry = data.find((entry) => entry.id === id)
  if (entry) {
    response.json(entry)
  } else {
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  data = data.filter((entry) => entry.id !== id)

  response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "no content",
    })
  }

  const entry = {
    id: Math.floor(Math.random() * 1000000),
    name: body.name,
    number: body.number,
  }

  data = data.concat(entry)

  response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
