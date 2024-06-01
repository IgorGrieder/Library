import mongoose from 'mongoose'

// Creating a book schema with the infos that a book will have
const bookSchema = new mongoose.Schema({
  id: { type: mongoose.SchemaTypes.ObjectId },
  name: { type: mongoose.SchemaTypes.String },
  editor: { type: mongoose.SchemaTypes.String },
  author: { type: mongoose.Schema.ObjectId, ref: 'authors' }
}, { versionKey: false })

// Creating a model that will indicate to the respective collection the infofrmation about the elements on it
const book = mongoose.model('books', bookSchema)

export { book, bookSchema }