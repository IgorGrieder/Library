import mongoose from 'mongoose';

// Creating a author schema with the infos that a book will have
const authorSchema = new mongoose.Schema({
  id: { type: mongoose.SchemaTypes.ObjectId },
  name: { type: mongoose.SchemaTypes.String },
  nationality: { type: mongoose.SchemaTypes.String },
  age: { type: mongoose.SchemaTypes.Number },
  image: [{ type: mongoose.SchemaTypes.String }],
  books: [{ type: mongoose.SchemaTypes.String }]
}, { versionKey: false })

// Creating a model that will indicate to the respective collection the infofrmation about the elements on it
const author = mongoose.model('authors', authorSchema)

export { author, authorSchema }