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
export default {
  data(){
    return {
        items:[{ title: '星期一', count: 1, locked: true }, //菜单的模拟数据
            { title: '星期二', count: 2, locked: true }, 
            {title: '星期三', count: 3, locked: false}
          ]
    }
  }
}
</script>
<style lang="less">
@import '../common/style/menu.less';
</style>
