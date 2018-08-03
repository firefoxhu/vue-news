<template>
  <div class="shop-container">
    <scroll ref="scroll" class="scroll" :data="shops" :pullup="pullup" @scrollToEnd="upMore">
      <ul class="list-content">
        <li @click="selectItem(item)" v-for="item in shops" :key="item.id" class="list-item">
          <p class="title">{{item.shopName}}</p>
          <ul class="list-images">
            <li class="icon"><img v-lazy="item.picture[0]"/></li>
            <li class="icon"><img v-lazy="item.picture[1]"/></li>
            <li class="icon"><img v-lazy="item.picture[2]"/></li>
          </ul>
          <p class="footer">
            <span class="address">{{item.address}} </span>
            <span class="shopName">{{item.shopName}}</span>
          </p>
        </li>
        <loading v-show="hasMore" title=""></loading>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script style="text/ecmascript-6">
/* eslint-disable */
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { RESPONSE_CODE } from 'api/config'
import { getShopList } from 'api/shop'
import { mapMutations } from 'vuex'

const size = 6 

export default {
  data () {
    return {
      page: 0,
      pullup: true,
      hasMore: true,
      shops: []
    }
  },
  created (){
    this._getShopList();
  },
  methods: {
    _getShopList() {
      this.page = 0
      this.hasMore = true
      getShopList(this.page, this.size).then((res) => {
        if (res.code === RESPONSE_CODE) {
            this.shops = res.data.list
            this.hasMore = res.data.hasNext
        }
      })
    },
    upMore () {
      this.$refs.scroll.refresh()
    },
    selectItem (item) {
      this.$router.push({
        path: `serverShop/${item.id}`,
      })
      this.setShop(item)
    },
    ...mapMutations({
        setShop: 'SET_SHOP'
    })
  },
  components: {
    Loading,
    Scroll
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
*
  margin 0
  padding 0
.shop-container
  position: fixed
  background-color #ffffff
  width: 100%
  top: 84px
  bottom: 0
  overflow hidden
  padding-bottom 5px
  .scroll
    height 100%
    width 100%
    .list-content
      .list-item
        .title
          font-weight bold
        margin 3px 8px
        border-bottom 1px solid #f4f5f6
        .list-images
          display flex
          flex-direction row
          align-items center
          .icon
            flex 1
            text-align center
            img
              width 100%
              height  80px
        .footer
          font-size 12px
          color #cccccc
          .address:before
            height 15px
            width 15px
            content url(addr.png)
            vertical-align middle
            display inline-block
</style>

