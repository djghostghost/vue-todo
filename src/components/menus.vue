<template>
    <div class="list-todos">
        <a @click="gotList(item.id)" class="list-to activeListClass list" :class="{'active': item.id === todoId}" v-for="item in items">
            <span class="icon-lock" v-if="item.locked"></span>
            <span class="count-list" v-if="item.count > 0">{{ item.count }}</span>
            {{ item.title }}
        </a>
        <a class="link-list-new" @click="addTodoList">
            <span class="icon-plus"></span>
            新增
        </a>
    </div>
</template>

<script>
import {getTodoList,addTodo} from '../api/api';
export default {
  data(){
    return {
        items:[],
        todoId:''
    };
  },
  created(){
      getTodoList({}).then(res => {
          const TODOS = res.data.todos;
          this.items = TODOS;
          this.todoId = TODOS[0].id;
      });
  },
  methods:{
      gotList(id) {
          this.todoId = id;
      },
      addTodoList(){
          addTodo({}).then(data => {
              getTodoList({}).then(res => {
                  const TODOS = res.data.todos;
                  this.todoId = TODOS[TODOS.length - 1].id;
                  this.items = TODOS;
              });
          });
      }
  },
  watch:{
    'todoId'(id) {
        this.$router.push({name:'todo',params:{id:id}});
    }
  },
};
</script>
<style lang="less">
@import '../common/style/menu.less';
</style>
