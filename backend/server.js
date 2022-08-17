import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/api/user', userRoutes)
app.use('/api/project', projectRoutes)

// app.get('/user', (req, res) =>
// res.send('Hello from server')
// )

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, () =>
      console.log(`Connected to dB and server running on port ${PORT}`)
    )
  )
