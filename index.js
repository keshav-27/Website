const { request } = require('express')
const express = require('express')
const fetch = require('node-fetch')
require('dotenv')
const {Client} = require('pg')

const app = express()
app.listen(process.env.PORT || 3000, () => console.log('listening at 3000'))
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const client = new Client({
  user: 'postgres',
  password: 'Keshav2019@',
  port: '5432',
  host: 'localhost',
  database: 'mydb'
})

async function execute() {
  await client.connect()
  await app.post('/api', (req, res) => {
    const dataRqst = req.body
    const myQuery = "SELECT * FROM data2 WHERE accel_x BETWEEN $1 AND $2 AND accel_y BETWEEN $3 AND $4 AND timestamp BETWEEN $5 AND $6"
    const parameters = [dataRqst.accelRqst[0], dataRqst.accelRqst[1], dataRqst.speedRqst[0], dataRqst.speedRqst[1], dataRqst.intervalRqst[0], dataRqst.intervalRqst[1]]
    client.query(myQuery, parameters , (err, result) => {
      if (err) {err => console.log(err)}
      res.json(result.rows)
    })
    console.log("sent")
    client.end
  })
}

execute()

/*app.post('/api', (req, res) => {
  const dataRqst = req.body
  res.json(dataRes)
})*/