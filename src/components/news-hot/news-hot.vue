<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="newsHotList" :pullup="pullup" @scrollToEnd="downMore">
      <div>
        <div v-if='newsHotSlider.length' class="slider-wrapper">
          <slider>
            <div v-for="item in newsHotSlider" :key="item.picUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl" style="height:180px"/>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <ul>
            <li @click="selectItem(item)" v-for="item in newsHotList" class="item" :key="item.id">
              <div class="icon">
                <img v-lazy="item.images[0]"/>
              </div>
              <div class="text">
                <div class="title" v-html="item.title"></div>
                <div class="info">
                  <span class="orgin" v-text="item.resource">今日头条</span>
                  <span class="time" v-text="item.time">1小时前</span>
                  <span class="views">{{ item.views }}浏览</span>
                </div>
              </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
          </ul>
        </div>
      </div>
      <div class="loading-content" v-show="!newsHotList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script style="text/ecmascript-6">
/* eslint-disable */
import Loading from 'base/loading/loading'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import { getNewsHotList, getNewsHotSlider } from 'api/newsHot'
import { RESPONSE_CODE } from 'api/config'
import { mapMutations } from 'vuex'

const size = 8 

export default {
  data () {
    return {
      page: 0,
      pullup: true,
      newsHotSlider: [],
      newsHotList: [],
      hasMore: true
    }
  },
  components: {
    Slider,
    Loading,
    Scroll
  },
  created () {
    this._getNewsHotSlider()
    this._getNewsHotList()
  },
  methods: {
    selectItem (item) {
      this.$router.push({
				path: `newsHot/${item.id}`
      })
      this.setNews(item)
    },
    downMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      getNewsHotList(this.page, this.size).then((res) => {
        if (res.code === RESPONSE_CODE) {
          this.newsHotList = this.newsHotList.concat(res.data.list)
          this.hasMore = res.data.hasNext
        }
      })
    },
    _getNewsHotList () {
      this.page = 0
      this.hasMore = true
      getNewsHotList(this.page, this.size).then((res) => {
                  console.log(res)
      if (res.code === RESPONSE_CODE) {

          this.newsHotList = res.data.list
          this.hasMore = res.data.hasNext
        }
      })
    },
    _getNewsHotSlider () {
      this.newsHotSlider = getNewsHotSlider().slider
    },
    loadImage () {
      if (!this.checkLoaded) {
        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 500)
        this.checkLoaded = true
      }
    },
    ...mapMutations({
      setNews: 'SET_NEWS'
    })
    
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
.recommend
  position: fixed
  width: 100%
  top: 84px
  bottom: 0
.recommend-content
  height: 100%
  overflow: hidden
.slider-wrapper
  position: relative
  width: 100%
  overflow: hidden
.recommend-list
  height 100%
.item
  display: flex
  flex-direction row
  box-sizing: border-box
  border-bottom 1px solid #f4f5f6
  padding 8px 8px
.icon
  width 120px
  height 80px
.icon img
  width 100%
  height 100%
.text
  padding-left 5px
  display: flex
  flex-direction: column
  width 100%
  flex: 1
.title
  font-size: 16px
  letter-spacing 1px
  line-height 17px
  height 51px
  color: #222222
  display -webkit-box;
  -webkit-box-orient vertical
  -webkit-line-clamp: 3
  overflow hidden
.info
  display flex
  flex-direction row
  justify-content: space-between
  overflow hidden
  height 29px
.time,.views,.orgin
  align-self: flex-end
  font-size 12px
  color #aaa
  overflow hidden
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
</style>
