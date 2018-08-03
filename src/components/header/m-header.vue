<template>
  <div class="m-header">
      <h1 class="text">电器资讯</h1>
  </div>
</template>

<script type="text/ecmascript-6">
export default {}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable'

.m-header
    position: relative
    height: 44px
    text-align center
    color: #FFFFFF
    font-size: 0
    background-color #D43D3D
    display flex
    justify-content center
.text
    margin 0
    padding 0
    align-self center
    font-family: KaiTi
    display: inline-block
    vertical-align: top
    line-height: 44px
    font-size: $font-size-large
</style>
