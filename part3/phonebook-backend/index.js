require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Entry = require("./models/entry")

app.use(express.json())
app.use(express.static("build"))
app.use(cors())

const log = (tokens, request, response) => {
  return [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, "content-length"),
    "-",
    tokens["response-time"](request, response),
    "ms",
    JSON.stringify(request.body),
  ].join(" ")
}

app.use(morgan(log))

app.get("/api/persons", (request, response) => {
  Entry.find({}).then((entries) => response.json(entries))
})

app.get("/info", (request, response) => {
  Entry.find({}).then((entries) => {
    response.send(
      `<p>Phonebook has info for ${
        entries.length
      } people</p><p>${new Date()}<p>`
    )
  })
})

app.get("/api/persons/:id", (request, response) => {
  Entry.findById(request.params.id)
    .then((entry) =>
      entry ? response.json(entry) : response.status(404).end()
    )
    .catch((error) => next(error))
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  console.log(body)

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing" })
  }

  const entry = new Entry({
    name: body.name,
    number: body.number,
  })

  entry.save().then((savedEntry) => {
    response.json(savedEntry)
  })
})

app.delete("/api/persons/:id", (request, response, next) => {
  Entry.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
