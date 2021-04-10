const express = require('express');
const app = express();
// const Joi = require('joi');

app.use(express.json());

const todos = require('./routes/api/todos');
const heroes = require('./routes/api/heroes')

app.use('/api/todos', todos);
app.use('/api/heroes', heroes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));