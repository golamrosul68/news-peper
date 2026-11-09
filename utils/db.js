
const mongoose = require('mongoose')

const db_connect = async () => {
    try {
        let database_url

        if (process.env.mode === 'production') {
            database_url = process.env.db_production_url
        } else {
            database_url = process.env.db_local_url
        }

        if (!database_url) {
            throw new Error('MongoDB URL is missing in .env file')
        }

        await mongoose.connect(database_url)

        console.log('MongoDB Database Connected Successfully!')
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message)
        throw error
    }
}

module.exports = db_connect
