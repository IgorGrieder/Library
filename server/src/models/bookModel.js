import mongoose from 'mongoose'
import { authorSchema } from './authorModel.js'

// Creating a book schema with the infos that a book will have
const bookSchema = new mongoose.Schema({
  id: { type: mongoose.SchemaTypes.ObjectId },
  name: { type: mongoose.SchemaTypes.String },
  category: [{ type: mongoose.SchemaTypes.String }],
  price: { type: mongoose.SchemaTypes.Number },
  author: authorSchema,
  image: [{ type: mongoose.SchemaTypes.String }]
}, { versionKey: false })

// Creating a model that will indicate to the respective collection the infofrmation about the elements on it
const book = mongoose.model('books', bookSchema)

export { book, bookSchema }