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
    let myQuery = "SELECT * FROM data2 WHERE accel_x BETWEEN $1 AND $2 AND accel_y BETWEEN $3 AND $4 ORDER BY accel_x"
    let parameters = [dataRqst.accelRqst[0], dataRqst.accelRqst[1], dataRqst.speedRqst[0], dataRqst.speedRqst[1]]

    if (dataRqst.accelRqst[0] == '') {
      parameters[0] = -Infinity; parameters[1] = Infinity
    }
    if (dataRqst.speedRqst[0] == ''){
      parameters[2] = -Infinity; parameters[3] = Infinity
    }
    client.query(myQuery, parameters , (err, result) => {
      if (err) {err => console.log(err)}
      res.json(result.rows)
      console.log("sent")
    })
    client.end
  })
}

execute()

/*app.post('/api', (req, res) => {
  const dataRqst = req.body
  res.json(dataRes)
})*/