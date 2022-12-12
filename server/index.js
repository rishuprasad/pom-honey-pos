const express = require('express')
const app = express()
const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
 
const connectDb = async () => {
    try {
        const pool = new Pool({
            user: process.env.PSQL_USER,
            host: process.env.PSQL_HOST,
            database: process.env.PSQL_DATABASE,
            password: process.env.PSQL_PASSWORD,
            port: process.env.PSQL_PORT,
            ssl: {rejectUnauthorized: false}
        });
 
        await pool.connect()
        const res = await pool.query('SELECT * FROM teammembers')
        console.log(res)
        await pool.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()


app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.listen(3001, () => {
    console.log("Running on port 3001");
})