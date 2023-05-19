const express = require('express')
const cors=require ('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('assignment 11 running on head')
  })
  
  app.listen(port, () => {
    console.log(`Assignment-11-server listening on port ${port}`)
  })