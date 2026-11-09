
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const body_parser = require('body-parser')
const cors = require('cors')
const db_connect = require('./utils/db')

// Load environment variables
dotenv.config()

// Middleware
app.use(body_parser.json())

if (process.env.mode === 'production') {
    app.use(cors())
} else {
    app.use(cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:3000"
        ]
    }))
}

// Routes
app.use('/', require('./routes/authRoutes'))
app.use('/', require('./routes/newsRoute'))

// Home route
app.get('/', (req, res) => {
    res.send('News Portal Backend is Running!')
})

// Server port
const port = process.env.PORT || 5000

// Database connection and server start
const startServer = async () => {
    try {
        await db_connect()

        app.listen(port, () => {
            console.log(`Server is running on port ${port}!`)
        })
    } catch (error) {
        console.error('Server startup failed:', error.message)
        process.exit(1)
    }
}

startServer()
