const express = require('express')

require('./db/mongoose')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task')

const app = express()

const port = process.env.port || 5000



app.use(express.json())

app.use(userRoute)
app.use(taskRoute)

// app.get('/users',(req,res) => {
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id

//     User.findById(_id).then((user) => {
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => res.status(500).send())
// })

// app.get('/tasks', (req, res) => {
//     Task.find({}).then((users) => {
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })





// app.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id

//     Task.findById(_id).then((user) => {
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((e) => res.status(500).send())
// })



// app.post('/tasks',(req, res) => {
//     const task = new Task(req.body)

//     task.save().then(() => {
//         res.send(task)
//     }).catch((error) => res.status(400).send(error))
// })


app.listen(port, () => {
    console.log('server port is running', port)
})
