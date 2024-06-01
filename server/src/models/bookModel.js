import mongoose from 'mongoose'

// creating a book schema with the infos that a book will have
const bookSchema = new mongoose.Schema({
  id: { type: mongoose.SchemaTypes.ObjectId }
}, { versionKey: false })

// creating a model that will indicate to the respective collection the infofrmation about the elements on it
const book = mongoose.model("books", bookSchema)

export default book