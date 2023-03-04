import express from 'express'
import dotenv from 'dotenv'
const port = process.env.PORT || 8000
import connectDB from './config/db'
import contactRoutes from './routes/contactRoutes'
import userRoutes from './routes/userRoutes'
import errorHandler from './middleware/errorMiddleware'
import postRoutes from './routes/postRoutes'
import cors from 'cors'
import { options } from './middleware/corsMiddleware'

dotenv.config()

connectDB()

const app = express()

app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/contacts', contactRoutes)
app.use('/api/blog', postRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started on port ${port}`)
})