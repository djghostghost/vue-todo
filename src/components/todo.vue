<template>
  <div class="page lists-show">
      <nav>
          <div class="nav-group">
              <a class="nav-item">
                  <span class="icon-list-unordered"></span>
              </a>
          </div>
          <h1 calss="title-page">
              <span class="title-wrapper">{{ todo.title}}</span>
              <span class="count-list">{{todo.count || 0}}</span>
          </h1>
          <div class="nav-group right">
                  <div class="options-web">
                    <a class="nav-item">
                        <span class="icon-lock" v-if="todo.locked"></span>
                        <span class="icon-unlock" v-else></span>
                    </a>
                    <a class=" nav-item">
                        <span class="icon-trash"></span>
                    </a>
                  </div>
            </div>

            <div class="form todo-new input-symbol">
                <input type="text" v-model="text" placeholder="please input" @keyup.enter="onAdd" :disabled="todo.locked"/>
                <span class="icon-add"></span>
            </div>
      </nav>
      <div class="content-scrollable list-items">
          <div v-for="item in items">
              <item :item="item"></item>
         </div>
      </div>
  </div>
</template>
<script>
import { getTodo,addRecord} from '../api/api'
import item from './item'
export default {
  components:{
      item
  },
  data(){
      return{
        todo:{
            title:'Monday',
            count:12,
            locked:false
        },
        items: [],
        text:'' //新增代办单项绑定的值
      }
  },
  methods:{
      init(){
          const ID = this.$route.params.id;
          getTodo({id:ID}).then(res=>{
              let {id,title,count,isDelete,locked,record} = res.data.todo;
              this.items=record;
              this.todo={
                  id:id,
                  title:title,
                  count:count,
                  locked:locked,
                  isDelete:isDelete
              };
          });
      },
      onAdd() {
          const ID=this.$route.params.id;
          addRecord({id:ID,text:this.text}).then(res=>{
              this.text='';
              this.init();
          });
      }
  },
  watch:{
      '$route.params.id'(){
          this.init();
      }
  },
  created(){
      this.init();
  }
};
</script>
<style lang="less">
@import '../common/style/nav.less';
@import '../common/style/form.less';
@import '../common/style/todo.less';
</style>
