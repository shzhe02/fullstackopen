const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

const url = process.env.MONGODB_URI

console.log("connecting to", url)
mongoose
  .connect(url)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.log("Error occured while connecting:", error.message)
  )
const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
})

entrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Entry", entrySchema)
