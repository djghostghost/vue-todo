<template>
  <div class="list-item editingClass editing">
      <lable class="checkbox">
          <input type="checkbox" v-model="item.checked">
          <span class="checkbox-custom"></span>
      </lable>
      <input type="text" v-model="item.text" placeholder="input something..."/>
      <a class="delete-item">
          <span class="icon-trash"></span>
      </a>
  </div>
</template>
<script>
export default {
  props:['item']
}
</script>
<style lang="less">
@import '../common/style/list-items.less';
</style>

