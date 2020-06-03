<template>
  <div class="todo">
    <h1 class="todo__heading">오늘의 일 .</h1>
    <router-link class="todo__button" to="/todo">작성하기</router-link>
    <TodoList />
  </div>
</template>

<script>
import TodoList from '../components/TodoList.vue';

export default {
  components: {
    TodoList,
  },
};
</script>

<style lang="scss">
@import './style.scss';

.todo {
  &__heading {
    text-align: center;
    border-bottom: 1px dashed #c3c3c3;
    padding-bottom: 30px;
  }
  &__button {
    text-decoration: none;
    color: #33485e;
    cursor: pointer;
    display: block;
    width: fit-content;
    margin: 25px auto;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px 20px;
    border-radius: 9px;
    &:hover {
      background-color: #d4d4d4;
    }
  }
}
</style>
