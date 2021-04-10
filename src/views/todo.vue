<template>
  <div class="todo-container">
    <Breadcrumbs />

    <h3
      :tabindex="isShowMenu || isShowPopup ? -1 : 0"
      class="main-header"
    >TODO</h3>

    <TodoInput @addToDo="handleAddToDo"/>
    <transition name="fade">
      <font-awesome-icon
        v-if="todos.length > 1"
        @click="removeTodo({}, true)"
        @keypress.enter="removeTodo({}, true)"
        :tabindex="isShowMenu || isShowPopup ? -1 : 0"
        title="remove all todos"
        class="icon-trash-alt"
        icon="trash-alt"
        size="lg"/>
    </transition>

    <ElementsList
      :elements="todos"
      :initPaginationPage="initPaginationPage"
      :type="'todos'"
      @updateElem="updateTodo"
      @removeElem="removeTodo"
      @currentPaginationPage="handleCurrentPaginationPage"/>

    <transition name="fade">
      <ConfirmPopup
          v-if="todoToRemove"
          :data="todoToRemove"
          @cancel="cancelRemoveTodo"
          @confirm="confirmRemoveTodo"/>
    </transition>

    <transition name="fade">
      <Toast
          v-if="isToast"
          :data="dataForToast"
          @destroyToast="hideToast"/>
    </transition>
  </div>
</template>

<script>
import Breadcrumbs from '../components/breadcrumbs';
import TodoInput from '../components/todo-input';
import ElementsList from '../components/elements-list';
import Toast from '../components/toast';
import ConfirmPopup from '../components/confirm-popup';
import { mapGettersForiSShowMenuAndIsShowPopup, toastMethodsMixin } from '../mixins';
import { todosService } from '../services';

export default {
  name: 'Todo',
  components: {
    Breadcrumbs,
    TodoInput,
    ElementsList,
    Toast,
    ConfirmPopup
  },
  mixins: [mapGettersForiSShowMenuAndIsShowPopup, toastMethodsMixin],
  data() {
    return {
      todos: [],
      isToast: false,
      removeAllTodos: false,
      currentPaginationPage: 0,
      initPaginationPage: 0,
      dataForToast: {
        message: '',
        duration: 2000 // milliseconds
      },
      todoToRemove: null,
    }
  },
  methods: {
    handleAddToDo(name) {
      todosService.addTodo(name).then(todo => {
          this.todos.push(todo);
          this.saveTodosOnStorages();
          this.showToast(`New Todo${ ' "' + name + '"' } has been added!`);
      }).catch((error) => this.showToast(`Something went wrong! ${error}`));
    },
    updateTodo(todo) {
      todosService.updateTodo(todo.elem.id, todo.key, todo.elem[todo.key]).then(response => {
        const index = this.findIndexForId(this.todos, response.id);
        this.todos[index][todo.key] = response[todo.key];
        this.saveTodosOnStorages();
        this.showToast(`Todo ${ todo.key } has been updated!`);
      }).catch((error) => this.showToast(`Something went wrong! ${error}`));
    },
    removeTodo(todo, removeAllTodos = false) {
      this.$store.dispatch('updateIsShowPopup', true);
      this.hideToast();
      if (!removeAllTodos) {
        const index = this.findIndexForId(this.todos, todo);
        this.todoToRemove =  { todo: this.todos[index], question: 'Do you want to remove task:', whatToRemove: this.todos[index].name };
      } else {
        this.removeAllTodos = true;
        this.todoToRemove = { question: 'Do you want to remove all tasks' }
      }
    },
    cancelRemoveTodo() {
      this.todoToRemove = null;
      this.removeAllTodos = false;
      this.$store.dispatch('updateIsShowPopup', false);
    },
    confirmRemoveTodo() {
      const params = this.todoToRemove && this.todoToRemove.todo && this.todoToRemove.todo.id ? this.todoToRemove.todo.id : '';
      todosService.removeTodo(params).then(response => {
        if (typeof response === 'string') {
          this.todos.splice(this.findIndexForId(this.todos, response), 1);
        } else  {
          this.todos = [];
        }

      this.showToast(
        !this.removeAllTodos
        ? `Todo ${'"' + this.todoToRemove.todo.name + '"'} has been removed!`
        : `All tasks has been removed!`);
      this.removeAllTodos = false;
      this.todoToRemove = null;
      this.saveTodosOnStorages();
      this.$store.dispatch('updateIsShowPopup', false);
      }).catch((error) => {
        this.todoToRemove = null;
        this.showToast(`Something went wrong! ${error}`)
      });
    },
    createTodoItem(name) {
      return {
        name: name
      }
    },
    findIndexForId([...array], id) {
      return array.findIndex(e => e.id === id);
    },
    saveTodosOnStorages() {
      const todosObjectToStorages = this.createObjectToUpdateStorages();
      localStorage.setItem('todos_state', JSON.stringify(todosObjectToStorages));
      this.$store.dispatch('updateTodosObject', todosObjectToStorages);
    },
    createObjectToUpdateStorages() {
      return { todos: this.todos, currentPaginationPage: this.currentPaginationPage };
    },
    handleCurrentPaginationPage(event) {
      this.currentPaginationPage = event;
      this.saveTodosOnStorages();
    },
  },
  created() {
    todosService.getTodos().then(todos => {
      this.todos = todos;
      const todos_state_from_localStorage = JSON.parse(localStorage.getItem('todos_state'));
      this.initPaginationPage = todos_state_from_localStorage ? todos_state_from_localStorage.currentPaginationPage : 0;
      this.$store.dispatch('updateTodosObject', this.createObjectToUpdateStorages());
    }).catch((error) => this.showToast(`Something went wrong! ${error}`));
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

.todo-container {
  @include container;
  .icon-trash-alt {
    position: absolute;
    top: 20px !important;
    right: 20px !important;
    cursor: pointer;
    @include hover-opacity;
    color: $royal-purpure-color;
  }
}
</style>