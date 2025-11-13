const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const tasks = [];
const { v4 } = require("uuid")

const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(cors())
app.get('/list', (req, res) => {
    return res.status(200).json({
        tasks
    })
})
app.post('/add', (req, res) => {
    const { title, description } = req.body
    const newTask = {
        title,
        description,
        done: false,
        id: v4()
    }
    tasks.push(newTask)
    res.status(201).json({
        task: newTask
    })
})
app.patch('/done/:id', (req, res) => {
    const { id } = req.params
    const task = tasks.find((v) => {
        return v.id === id
    })
    if (task !== undefined) {
        task.done = true
        return res.status(200).json({
            task
        });
    } else {
        return res.status(404).json({
            message: 'not found'
        });
    }

})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    const index = tasks.findIndex((v) => {
        return v.id === id
    })
    if (index !== -1) {
        tasks.splice(index, 1)
        return res.status(200).json({
            tasks
        })
    } else {
        return res.status(404).json({
            message: 'not found'
        });
    }
    // if (task !== undefined) {
    //     task.done = true
    //     return res.status(200).json({
    //         task
    //     });
    // } else {
    //     return res.status(404).json({
    //         message: 'not found'
    //     });
    // }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})