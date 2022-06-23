const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 4000

app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`)
})