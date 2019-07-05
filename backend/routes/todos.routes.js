const express = require('express');
const router = express.Router();

const Todo = require("../models/todo.model");

router.get('/', async (req, res)=> {
    const todos = await Todo.find()
    res.json(todos);
})

router.post('/add', async (req, res)=> {
    const todo = new Todo(req.body)
    await todo.save()
        .then(data => {
            res.json({status: 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('Fail adding a new todo');
        })
})

router.get('/:id', async (req, res)=> {
    await Todo.findById(req.params.id, (err, todo)=> {
        if (err){
            console.log(err)
        }else{
            res.json(todo);
        }
    })
})

router.put('/update/:id', async (req, res)=> {
    const {
        todo_description,
        todo_responsible,
        todo_priority,
        todo_complete
    } = req.body;

    const updateTodo = {
        todo_description,
        todo_responsible,
        todo_priority,
        todo_complete
    };
    await Todo.findByIdAndUpdate(req.params.id, updateTodo, {useFindAndModify:false});
    res.json({status: 'Task Updated'});
})

router.delete('/:id', async (req, res)=> {
    await Todo.findByIdAndRemove(req.params.id, {useFindAndModify:false});
    res.json({status: 'Task Remove'});
});

module.exports = router;