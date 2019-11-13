const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology: true
})



// const me = new User ({
//     name : 'Andrew',
//     age : 27,
//     email : 'bikerz.bashir@gmail.com',
//     password : 'hellow'
// })

// me.save().then((data) => console.log(data)).catch((e) => console.log(e))



// newTask.save().then((data) => console.log(data)).catch((e) => console.log(e))

