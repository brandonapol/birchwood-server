import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        // tslint:disable-next-line:no-console
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
    	// tslint:disable-next-line:no-console
        console.log(error)
        process.exit(1)
    }
}

export default connectDB