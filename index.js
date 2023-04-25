// Main: hosts a server
// localhost:8080

const express = require('express')
const app = express()

// set up a static file directory at src so that all files can be accessed publicly
app.use(express.static('public'))

app.listen(8080, () => {
    console.log('Server listening on port 8080')
})
