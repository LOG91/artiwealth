<template>
  <div class="todo-form">
    <div class="item-box">
      <div class="item-box__title">제목</div>
      <input
        v-on="listeners"
        name="title"
        v-model="inserted.title"
        class="item-box__input"
        v-bind:class="{ empty: emptyCheck.title }"
      />
    </div>
    <div class="item-box">
      <div class="item-box__title">내용</div>
      <input
        v-on="listeners"
        name="content"
        v-model="inserted.content"
        class="item-box__input"
        v-bind:class="{ empty: emptyCheck.content }"
      />
    </div>
    <div class="item-box">
      <div class="item-box__title">기간</div>
      <input
        class="item-box__input"
        name="due"
        v-on="listeners"
        type="date"
        id="start"
        v-model="dateData"
        min="2010-01-01"
        max="2100-12-31"
        v-bind:class="{ empty: emptyCheck.due }"
      />
    </div>
    <div class="item-box">
      <div class="item-box__title">우선순위</div>
      <input
        v-on="listeners"
        name="priority"
        v-model="inserted.priority"
        class="item-box__input"
        v-bind:class="{ empty: emptyCheck.priority }"
      />
    </div>
    <div class="item-box">
      <div class="item-box__title">완료</div>
      <label class="container">
        <input
          type="checkbox"
          v-model="inserted.state"
          v-on:click="toggle"
          v-bind:class="{ empty: emptyCheck.state }"
        />
        <span class="checkmark"></span>
      </label>
    </div>
  </div>
</template>

<script>
import { formatDate } from '../helper.js';
export default {
  data() {
    return {
      dateData: formatDate(new Date()),
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: ({ target }) => {
          if (target.value !== '') this.emptyCheck[target.name] = false;
          if (target.name === 'due') {
            this.$emit('insert', {
              name: target.name,
              value: target.valueAsNumber,
            });
          } else {
            this.$emit('insert', {
              name: target.name,
              value: target.value,
            });
          }
        },
      };
    },
  },
  methods: {
    toggle() {
      this.$emit('toggle');
    },
  },
  props: {
    inserted: {
      type: Object,
      required: true,
    },
    emptyCheck: {
      type: Object,
      required: true,
    }
  },
};
</script>

<style lang="scss">
.todo-form {
  margin-bottom: 20px;
  .item-box {
    display: flex;
    padding: 15px 90px;
    justify-content: space-between;
    &__title {
      padding: 5px 0;
      min-width: 50px;
    }
    &__input {
      min-width: 180px;
      border-radius: 3px;
      border: 1px solid #d6d6d6;
      &.empty {
        border: 2px dashed #ffa0a0;
      }
    }
  }
  label {
    margin-right: 77px;
  }
}
</style>
