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
    client.query("SELECT * FROM data1 WHERE accel_X < $1", [dataRqst.accelRqst[0]] , (err, result) => {
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