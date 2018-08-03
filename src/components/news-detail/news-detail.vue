<template>
    <transition name="slide">
        <div class="news-detail-container">
            <div class="top-bar">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <p class="title">资讯详情</p>
            </div>
            <scroll ref="scroll" class="scroll" :pullup="pullup" @scrollToEnd="resizeHeight">
                <div class="content" v-html="news.content">
                </div>
            </scroll>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import {mapGetters} from 'vuex'
/* eslint-disable */
  export default {
    data () {
        return {
            pullup: true
        }
    },
    computed: {
        ...mapGetters([
            'news'
        ])
    },
    created() {
        if(!this.news.id){
            this.$router.push({
                path: '/newsHot'
            })
            return
        }
        
        setTimeout(() => {
            if (!this.$refs.scroll) {
                return
            }
            this.$refs.scroll.refresh()
        }, 500)

        // document.addEventListener('click', function (e) {
        //     if (e.target.tagName === 'IMG') {
        //         console.log("放大图片 这是全局得在哪里点都能被监听到草")
        //     }
        // })
    },
    methods: {
        resizeHeight () {
            if (!this.$refs.scroll) {
                return
            } 
            this.$refs.scroll.refresh()
        },
        back () {
            this.$router.back()
        }
    },
    components: {
        Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.news-detail-container
    position fixed
    top 0
    left 0
    width 100%
    background-color #ffffff
    height 100%
    .top-bar
        display: -webkit-flex
        direction row
        height 44px
        align-items center
        background-color #D43D3D
        .back
            font-size: $font-size-large-x
            color #ffffff
        .title
            flex 1
            text-align center
            font-size: 17px
            align-self: flex-end
            color #ffffff
    .scroll
        height 100%
        overflow hidden
        .content
            padding 2px 3px 55px 3px
            color #000
 .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  
</style>