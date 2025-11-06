const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const tasks = [];

const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(cors())
app.get('/list', (req, res) => {
    return res.status(200).json({
        // tasks: tasks
        tasks
    })
})
app.post('/add', (req, res) => {
    const { title, description } = req.body
    const newTask = {
        title, description
    }
    tasks.push(newTask)
    res.status(201).json({
        task: newTask
    })
})
app.patch('/done', (req, res) => {
    res.send('Hello World!')
})

app.delete('/delete', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})