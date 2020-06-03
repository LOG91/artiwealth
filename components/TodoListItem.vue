<template>
  <li class="todo__item" v-bind:class="{ active: todo.state }">
    <label class="container">
      <input
        type="checkbox"
        v-model="todo.state"
        @click="$emit('check', { ...todo, state: !todo.state })"
      />
      <span class="checkmark"></span>
    </label>
    <div class="todo__title">{{ todo.title }}</div>
    <div class="todo__content">{{ todo.content }}</div>
    <div class="todo__due">{{ formatDate(todo.due) }}</div>
    <div class="button-box">
      <router-link
        :to="{ name: 'add', params: { ...todo, isUpdate: true } }"
        ><i class="fas fa-pencil-alt todo__icon"></i
      ></router-link>
      <i class="fas fa-times todo__icon" @click="$emit('remove', todo.id)"></i>
    </div>
  </li>
</template>

<script>
import { formatDate } from '../helper.js';

export default {
  methods: {
    formatDate,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import '../style.scss';
.todo {
  @extend .todo;
  .button-box {
    width: 70px;
    margin: auto 0;
  }
  &__title {
    margin: auto 0;
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 600;
    margin-right: 5px;
  }
  &__content {
    margin: auto 0;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 130px;
    margin-right: 40px;
  }
  &__due {
    font-size: 12px;
  }
  &__item {
    cursor: pointer;
    transition: background-color 0.3s;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border: 1px solid #dadada;
    padding: 20px 15px;
    border-radius: 5px;
    &.active {
      background-color: #e6e6e6;
    }
  }
  &__icon {
    cursor: pointer;
    color: #6b6b6b;
    margin: 0 3px;
    &:hover {
      color: #616ecc;
      transition: transform 0.1s;
      transform: scale(1.2);
    }
  }
}
</style>
