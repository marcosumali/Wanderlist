var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: Boolean,
    todo: String,
},{
    timestamps: true
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;