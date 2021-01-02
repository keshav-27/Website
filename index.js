const express = require('express')
const fetch = require('node-fetch')
const mysql = require('mysql')
require('dotenv')

const app = express()
app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Keshav2019@',
  database: 'testDB'
})

con.connect((err) => {
  if (err) {throw err}
  console.log('connected')
  /*const sql = "DROP TABLE customers"
  con.query(sql, (err, result) => {
    if(err) {throw err}
    console.log("table dropped")
  })*/
})

app.post('/api', (request, response) => {
  const data = request.body
  const timestamp = Date.now()
  data.timestamp = timestamp
  response.json(data)
})