const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    description : {
        type : String,
        trim : true,
        required : true
    },
    completed : {
        type : Boolean,
        default : false
    }
})

const newTask = new Task({
    description : "Clean Dishes",
    completed : false
})

module.exports = Task