const mongoose = require("mongoose")
mongoose.set("strictQuery", true)
const password = process.argv[2]

const url = process.env.MONGODB_URI

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Entry = mongoose.model("Entry", entrySchema)

if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  mongoose
    .connect(url)
    .then(() => {
      const note = new Entry({
        name,
        number,
      })

      return note.save()
    })
    .then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
} else if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    Entry.find({}).then((entries) => {
      console.log("phonebook:")
      entries.forEach((entry) => console.log(`${entry.name} ${entry.number}`))
      return mongoose.connection.close()
    })
  })
} else {
  console.log("Invalid number of arguments")
  process.exit(1)
}
