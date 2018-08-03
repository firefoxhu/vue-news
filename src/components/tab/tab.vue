<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/newsHot">
      <span class="tab-link">热点</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/newsCategory">
      <span class="tab-link">分类</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/serverShop">
      <span class="tab-link">服务</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/repair">
      <span class="tab-link">售后</span>
    </router-link>
  </div>
</template>

<script style="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
.tab
  display flex
  height 40px
  line-height 40px
  font-size $font-size-medium-x
  background-color: #f4f5f6
.tab-item
  flex 1
  text-align center
.tab-link
  font-family: SimHei
  color #505050
&.router-link-active .tab-link
  color #D43D3D
</style>
