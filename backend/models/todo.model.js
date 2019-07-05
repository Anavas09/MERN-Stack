const mongoose = require("mongoose");
const { Schema }= mongoose;

const Todo = new Schema({
    todo_description: {
        type: String
    },
    todo_responsible: {
        type: String
    },
    todo_priority: {
        type: String
    },
    todo_complete: {
        type: Boolean
    }
})

module.exports = mongoose.model('Todo', Todo);