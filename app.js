const express = require('express')
const todoController = require('./controllers/todoController') 
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('./assets'))

// fire controllers
todoController(app)


app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`))
