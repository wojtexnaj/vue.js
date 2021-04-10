const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    created: {
        type: Date
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;