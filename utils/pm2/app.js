const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

const process = require('process')
console.log('pm2 env => ', process.env.NODE_ENV) // dev

app.listen(3000, () => console.log('Example app listening on port 3000!'))
