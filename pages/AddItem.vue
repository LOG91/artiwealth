<template>
  <div class="add-box">
    <router-link class="add-box__button--back" to="/"
      ><i class="fas fa-long-arrow-alt-left"></i
    ></router-link>
    <h1 class="add-box__heading">할 일 적기 .</h1>
    <TodoForm
      v-bind:inserted="inserted"
      v-bind:emptyCheck="emptyCheck"
      @toggle="toggle"
      @insert="insertData"
    />
    <div class="button-box">
      <a
        v-on:click="saveTodo"
        class="button-box__a button-box__button"
        :to="{ name: 'root', params: { ...inserted } }"
        >저장</a
      >
      <router-link
        v-on:click.native="removeTodo"
        class="button-box__a button-box__button"
        to="/"
        >삭제</router-link
      >
    </div>
  </div>
</template>

<script>
import TodoForm from '../components/TodoForm.vue';
import axios from 'axios';
import { formatDate } from '../helper.js';

export default {
  components: {
    TodoForm,
  },
  created() {
    for (const value in this.$route.params) {
      this.inserted[value] = this.$route.params[value];
    }
    this.isUpdate = this.$route.params.isUpdate;
  },
  data() {
    return {
      isUpdate: false,
      inserted: {
        title: '',
        content: '',
        due: '',
        priority: '',
        state: true,
      },
      emptyCheck: {
        title: null,
        content: null,
        due: null,
        priority: null,
        state: null,
      },
    };
  },
  methods: {
    insertData({ name, value }) {
      this.inserted[name] = value;
    },
    toggle() {
      this.inserted.state = !this.inserted.state;
    },
    removeTodo() {
      axios.delete(`/memo/${this.inserted.id}`).then((res) => console.log(res));
    },
    saveTodo() {
      const obj = { ...this.emptyCheck };
      for (const value in this.inserted) {
        if (this.inserted[value] === '') obj[value] = true;
        this.emptyCheck = obj;
      }
      if (Object.values(this.emptyCheck).filter((v) => v === true).length > 0) {
        return;
      }
      if (this.isUpdate) {
        axios.put(`/memo/${this.inserted.id}`, {
          ...this.inserted,
        });
        this.$router.push({ path: '/' });
      } else {
        const { title, content, due, priority, state } = this.inserted;
        // 조건문 넣자
        axios.post('/memo', {
          id: new Date().valueOf(),
          title,
          content,
          due: due || Date.now(),
          priority,
          state,
        });
        this.$router.push({ path: '/' });
      }
    },
  },
  TodoForm,
};
</script>

<style lang="scss">
@import './style.scss';

.add-box {
  @extend .todo;
  &__heading {
    border-bottom: 1px dashed #c3c3c3;
    padding-bottom: 30px;
    margin-bottom: 30px;
  }
  &__button--back {
    cursor: pointer;
    background-color: #ffffff;
    border: 1px solid #ccc;
    color: #33485e;
    padding: 4px 10px;
    font-size: 15px;
    &:hover {
      background-color: #dcdcdc;
    }
  }
}
#app {
  max-width: 400px;
  margin: 0 auto;
  color: $vue-blue;
}
.button-box {
  text-align: center;
  &__button {
    text-decoration: none;
    color: #33485e;
    background-color: #fff;
    padding: 8px 15px;
    border-radius: 3px;
    border: 1px solid #dadada;
    &:hover {
      background-color: #d4d4d4;
    }
  }
}
</style>
