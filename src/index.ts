import mongoose from 'mongoose'
import { app } from './server'

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)

    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log({ error })
    process.exit(1)
  }
}

startServer()
