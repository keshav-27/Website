const express = require('express')
const fetch = require('node-fetch')
const mysql = require('mysql')
require('dotenv')

const app = express()
app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const con = mysql.createConnection({
  host: 'localhost',
  username: 'root',
  password: '778101'
})

con.connect((err) => {
  if (err) {throw err}
  console.log('connected')
  const sql = "CREATE DATABASE testDB"
  con.query(sql, (err, result) => {
    if(err) {throw err}
    console.log("database created")
  })
})

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end()
      return
    }
    response.json(data)
  })
})

app.post('/api', (request, response) => {
  const data = request.body
  const timestamp = Date.now()
  data.timestamp = timestamp
  database.find({intervalRqst: data.intervalRqst})
  response.json(data)
})