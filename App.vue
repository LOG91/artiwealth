<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoList,
  },
};
</script>

<style lang="scss">
@import './style.scss';

#app {
  max-width: 400px;
  margin: 0 auto;
  color: $vue-blue;
}

h1 {
  text-align: center;
}
</style>
