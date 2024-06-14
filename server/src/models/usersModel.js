import mongoose from 'mongoose';

// Defining Address Schema
const addressSchema = new mongoose.Schema({
  street: String,
  number: String,
  neighborhood: String,
  country: String,
  complement: String
});

// Creating a user schema with the infos that a user will have
const userSchema = new mongoose.Schema({
  id: { type: mongoose.SchemaTypes.ObjectId },
  name: { type: mongoose.SchemaTypes.String },
  password: { type: mongoose.SchemaTypes.String },
  role: { type: mongoose.SchemaTypes.String },
  address: addressSchema,
}, { versionKey: false });

// Creating a model that will indicate to the respective collection the infofrmation about the elements on it
const user = mongoose.model('users', userSchema);

export default user


