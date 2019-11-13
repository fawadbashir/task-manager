require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5db5ee4888a5be2f38cb472e').then(() => {
//     return Task.countDocuments({completed : false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskandCount = async (id,completed) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

deleteTaskandCount('5db5eeb988a5be2f38cb472f', false).then((result) => console.log(result))
.catch((e) => console.log(e) )

