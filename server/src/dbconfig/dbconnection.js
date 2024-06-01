import mongoose from "mongoose"

const connectDb = async () => {
  try {
    // Connectin to mongoDB using mongoose
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
    console.log("Connection done with mongo")
  } catch (err) {
    console.log(err)
  }
}

export default connectDb
