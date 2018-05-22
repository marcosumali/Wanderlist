const ModelTodo = require('../models/m_todos');
const ObjectId = require('mongodb').ObjectID;
let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    role: String
}, {
    timestamps: true
});

let User = mongoose.model('User', userSchema);

// userSchema.post('remove', function(user) {

    // console.log(user, 'from hooks user');

    // ModelTodo.find({})
    //     .exec()
    //     .then(results => {

    //         console.log(results,'ini todo hooks')

    //         results.map(todo => {

    //             if (user._id == todo.userId) {

    //                 ModelTodo.findOneAndRemove({ _id: ObjectId(todo._id) })
    //                 .then(result => {
        
    //                     res.status(200).json({
    //                         message: 'Delete related user including owned todo successfull',
    //                         todo_deleted: result
    //                     })
        
    //                 })
    //                 .catch(err => {
        
    //                     res.status(400).json({
    //                         message: 'Error: Delete related user including owned todos',
    //                         err
    //                     })
        
    //                 })
        
    //             }

    //         })

    //     })
    //     .catch(err => {

    //         res.status(400).json({
    //             message: 'Error hooks: delete users',
    //         })

    //     })

// })


module.exports = User;