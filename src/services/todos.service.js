import * as axios from 'axios';

const URL = 'api/todos'

const getTodos = async function() {
    try {
      const response = await axios.get(URL);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const addTodo = async function(todoName) {
    try {
      const response = await axios.post(URL, { name: todoName });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  const removeTodo = async function(todoId) {
    try {
      const response = await axios.delete(`${URL}/${ todoId ? todoId : '0' }`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  const updateTodo = async function(todoId, key, value) {
    try {
      const response = await axios.put(URL, { id: todoId, key: key, value: value });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  export const todosService = {
    getTodos,
    addTodo,
    removeTodo,
    updateTodo
};