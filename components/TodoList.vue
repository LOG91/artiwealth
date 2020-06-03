<template>
  <div>
    <ul class="todo__list" v-if="todos.length">
      <TodoListItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @remove="removeTodo"
        @check="checkTodo"
      />
    </ul>
    <p v-else>
      오늘의 일정이 없습니다 작성해보세요 :)
    </p>
  </div>
</template>

<script>
import BaseInputText from './BaseInputText.vue';
import TodoListItem from './TodoListItem.vue';
import axios from 'axios';

let nextTodoId = 1;

export default {
  components: {
    BaseInputText,
    TodoListItem,
  },
  beforeupdat: async function() {
    const { data } = await axios.get(
      '/memo?_sort=state,priority,due&_order=DESC,ASC,ASC'
    );
    this.todos = [...data];
  },
  created: async function() {
    const { data } = await axios.get(
      '/memo?_sort=state,priority,due&_order=DESC,ASC,ASC'
    );

    this.todos = [...data];
  },
  data() {
    return {
      newTodoText: '',
      todos: [],
    };
  },
  methods: {
    checkTodo(todoObj) {
      axios
        .put(`/memo/${todoObj.id}`, { ...todoObj })
        .then((res) => console.log(res));
    },
    removeTodo(idToRemove) {
      axios.delete(`/memo/${idToRemove}`).then((res) => console.log(res));

      this.todos = this.todos.filter((todo) => todo.id !== idToRemove);
    },
  },
};
</script>

<style lang="scss">
.todo {
  &__list {
    padding: 0;
  }
}
</style>
