<template>
  <div class="slider" ref="slider">
      <div class="slider-group" ref="sliderGroup">
        <slot></slot>
      </div>
      <div class="dots">
          <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active: currentPageIndex === index}"></span>
      </div>
  </div>
</template>

<script style="text/ecmascript-6">
/* eslint-disable */
import BScroll from 'better-scroll'
import { addClass } from 'common/js/dom'
export default {
    data() {
        return {
            dots: [],
            currentPageIndex: 0
        }
    },
    props: {
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: Number,
            default: 2000
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth()
            this._initDots()
            this._initSlider()

            if (this.autoPlay){
                this._play()
            }
        }, 20);

        //监听窗口重置
        window.addEventListener('resize', () => {
            if(!this.slider){
                return
            }

            this._setSliderWidth(true)
            this.slider.refresh()
        })
    },
    methods: {
        _setSliderWidth(isResize) {
            //获取所有得轮播图
            this.children = this.$refs.sliderGroup.children
            //定义计算整个图爿加起来得宽度 做无缝
            let width = 0
            //获取父容器slider得宽度 给子元素赋值
            let sliderWidth = this.$refs.slider.clientWidth
            //循环遍历所有得子元素 设置宽度 和 样式
            for (let i = 0; i< this.children.length; i++) {
                let child = this.children[i]
                addClass(child,'slider-item')
                child.style.width = sliderWidth + 'px'
                width += sliderWidth
            }

            if(this.loop && !isResize) {
                width += 2 * sliderWidth
            }

            this.$refs.sliderGroup.style.width = width + 'px'
        },
        _initSlider() {
            this.slider = new BScroll(this.$refs.slider, {
              scrollX: true,
              scrollY: true,
              momentum: false,
              snap: true,
              snapLoop: this.loop,
              snapThreshold: 0.3,
              snapSpeed: 400
            })

            this.slider.on('scrollEnd', () => {
                let pageIndex = this.slider.getCurrentPage().pageX
                if (this.loop){
                    pageIndex -= 1
                }
                this.currentPageIndex = pageIndex

                if(this.autoPlay) {
                    clearTimeout(this.timer)
                    this._play();
                }
            })
        },
        _initDots() {
            this.dots = new Array(this.children.length)
        },
        _play() {
            let pageIndex = this.currentPageIndex + 1
            if(this.loop){
                pageIndex += 1;
            }
            this.timer = setTimeout(() => {
                this.slider.goToPage(pageIndex, 0, 400)
            }, this.interval)
        }
    },
    destroyed() {
        //销毁时做清理
        clearTimeout(this.timer)
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
.slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
