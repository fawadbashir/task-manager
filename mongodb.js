
const { MongoClient, ObjectID } = require('mongodb')



const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

    if (error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Fawad',
    //     age: 27
    // }, (error, result) => console.log(result.ops))

    // db.collection('tasks').insertMany([{
    //     description: 'Buy Grocery',
    //     completed: false
    // }, {
    //     description: 'Do the walk',
    //     completed: true
    // }, {
    //     description: 'Rent a apartment',
    //     completed: false
    // }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('unable to insert tasks')
    //     }
    //     return console.log(result.ops)
    // })

    // db.collection('tasks').findOne({ _id: new ObjectID("5d94ec6adbdb69159002200d") }, (error, user) => {
    //     if (error) {
    //         return console.log(error)
    //     }
    //     return console.log(user)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, result) => {
    //     if (error) {
    //         return console.log(error, 'error')
    //     }
    //     console.log(result)
    //     return result
    // })

    //     db.collection('tasks').updateOne({
    //         _id : new ObjectID('5da9cc40a1a5d90cacf4e7b9')
    //     }, {
    //         $set : {
    //             description : 'Sell the House'
    //         }
    //     }).then((result) => console.log('changed'))

//     db.collection('tasks').updateMany({
//         description : 'sell the house'
//     },{
//         $set : {
//             completed : false
//         }
//     }).then(()=> console.log('updated'))

    db.collection('tasks').deleteOne({
        _id : new ObjectID('5da9cc40a1a5d90cacf4e7b9')}
        
    ).then((result) =>console.log(result.deletedCount)).catch((e) => console.log(e))

})






//C://'program files'/mongodb/server/4.2/bin/mongod --dbpath=c:/users/biker/mongodb-data