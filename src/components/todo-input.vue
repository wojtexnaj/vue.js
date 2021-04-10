<template>
  <div class="todo-container">
    <div class="todo-input-box">
      <input
        :tabindex="isShowPopup || isShowMenu ? -1 : 0"
        @keypress="addTodo"
        v-model="todo"
        class="todo-input"
        type="text"
        name="todo"
        placeholder="Add todo">
      <transition name="fade">
        <span class="hint" v-if="todo">
          <span class="hint__enter">enter</span>
          <font-awesome-icon class="icon-keyboard" icon="keyboard" size="xs"/>
        </span>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGettersForiSShowMenuAndIsShowPopup } from '../mixins/initial-computed';

export default {
  name: 'TodoInput',
  mixins: [mapGettersForiSShowMenuAndIsShowPopup],
  data() {
      return {
          todo: ''
      }
  },
  methods: {
      addTodo(e) {
          if(e.code === 'Enter') {
            this.todo = this.todo.trim();
            this.$emit('addToDo', this.todo);
            this.todo = '';
          }
      }
  }
}
</script>

<style lang="scss" scoped>
@import '.././design/index.scss';

@include input-container(todo);
.todo-container {
  .todo-input-box {
    position: relative;
    .hint {
      position: absolute;
      right: 0;
      top: 20%;
      &__enter {
        font-size: 14px;
        margin-right: 2px;
        }
    }
  }
}
</style>