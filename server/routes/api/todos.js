require('../../db/mongoose');
const express = require('express');
const app = express();
const Todo = require('../../models/todo');

app.use(express.json());
const router = express.Router();

router.get('/', (req, res) => {
    const todosDb = getTodos();
    todosDb.then(todos => {
        res.send(todos);
    }).catch(err => res.send(err))
});

router.post('/', (req, res) => {
    if (!req || !req.body) return res.status(404).send('Miss body in request!');

    const addedTodo = addTodo(req.body.name);
    addedTodo.then(todo => {
        res.send(mapTodoObject(todo));
    }).catch(err => res.send(err));
});

router.put('/', (req, res) => {
    if (!req || !req.body || !req.body.id || !req.body.key || !req.body.value) return res.status(404).send('Miss body or some property (id, key, value) in request!');

    updateTodo(req.body.id, req.body.key, req.body.value).then(todo => {
        res.send(todo);
    }).catch(err => send(err));
});

router.delete('/:id', (req, res) => {
    if (!req || !req.params || !req.params.id) return res.status(404).send('Miss id in params!');
    console.log(req.params)

    if (req.params && req.params.id !== '0') {
        removeTodo(req.body.id).then(() => {
            res.send(req.params.id);
        }).catch(err => res.send(err));
    } else {
        removeAllTodos().then(() => res.send([])).catch(err => req.send(err));
    }
});

//// db functions

const getTodos = async () => {
    try {
        const todos = await Todo.find({});
        return todos.map(mapTodoObject);
    } catch(err) {
        return err;
    }
}

const addTodo = async (todoName) => {
    try {
        const todo = new Todo({
            name: todoName,
            created: new Date()
        });
        await todo.save();
        return todo;
    } catch (err) {
        return err;
    }
}

const removeTodo = async (todoId) => {
    try {
        Todo.deleteOne({ id: todoId}, (err) => {
            if (err) return err;
        })
    } catch (err) {
        return err;
    }
}

const removeAllTodos = async () => {
    try {
        Todo.remove({}, (err) => {
            if (err) return err;
        })
    } catch (err) {
        return err;
    }
}

const updateTodo = async (id, key, value) => {
    try {
        const todo = await Todo.findById(id)
        todo[key] = value;
        await todo.save();
        return mapTodoObject(todo);
    } catch (err) {
        return err;
    }
}

//// map functions

const mapTodoObject = (todo) => {
    return {
        name: todo.name,
        id: todo.id,
        description: todo.description,
        created: todo.created
    };
}

module.exports = router;
