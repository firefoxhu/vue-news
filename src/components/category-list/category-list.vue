<template>
    <transition name="slide">
        <div class="category-list">
            <div class="top-bar">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <p class="title">分类>{{title}}</p>
            </div>
            <scroll ref="scroll" class="category-content" :data="newsList" :pullup="pullup" @scrollToEnd="downMore">
                <ul>
                    <li @click="selectItem(item)" v-for="item in newsList" class="item" :key="item.id">
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
            </scroll>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script style="text/ecmascript-6">
/* eslint-disable */
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import { getNewsByCategoryId } from 'api/newsHot'
import { RESPONSE_CODE } from 'api/config'
import {mapGetters, mapMutations} from 'vuex'

const size = 8 

export default {
    data () {
        return {
            page: 0,
            pullup: true,
            newsList: [],
            hasMore: true,
            title: '',
            id: ''
        }
    },
     components: {
        Loading,
        Scroll
    },
    created () {
        if (!this.news.id) {
            this.$router.push({
                path: '/newsCategory'
            })
            return
        }
        this.title = this.news.title
        this.id = this.news.id
        this._getNewsList()
    },
    methods: {
        selectItem (item) {
            this.$router.push({
                path: `newsCategory/${item.id}`
            })
            this.setNews(item)
        },
        back () {
            this.$router.push({
                path: '/newsCategory'
            })
        },
        downMore () {
            if (!this.hasMore) {
                return
            }
            this.page++
            getNewsByCategoryId(this.id, this.page, this.size).then((res) => {
                if (res.code === RESPONSE_CODE) {
                    this.newsList = this.newsList.concat(res.data.list)
                    this.hasMore = res.data.hasNext
                }
                if (!this.$refs.scroll) {
                    return
                } 
            })
        },
        _getNewsList () {
            this.page = 0
            this.hasMore = true
            getNewsByCategoryId(this.id, this.page, this.size).then((res) => {
                if (res.code === RESPONSE_CODE) {
                    this.newsList = res.data.list
                    this.hasMore = res.data.hasNext
                }
            })
        },
        ...mapMutations({
            setNews: 'SET_NEWS'
        })
    },
    computed: {
        ...mapGetters([
            'news'
        ])
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
.category-list
    position fixed
    top 0
    left 0
    width 100%
    background-color #ffffff
    height 100%
    .top-bar
        display -webkit-flex
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
            font-size 17px
            align-self flex-end
            color #ffffff
    .category-content
        height 100%
        overflow hidden 
        ul 
            padding-bottom 60px
        .item
            display flex
            flex-direction row
            box-sizing border-box
            border-bottom 1px solid #f4f5f6
            padding 8px 8px
            .icon
                width 120px
                height 80px
                img
                    width 100%
                    height 100%
            .text
                padding-left 5px
                display flex
                flex-direction column
                width 100%
                flex 1
                .title
                    font-size 16px
                    letter-spacing 1px
                    line-height 17px
                    height 51px
                    color #222222
                    display -webkit-box
                    -webkit-box-orient vertical
                    -webkit-line-clamp 3
                    overflow hidden
                .info
                    display flex
                    flex-direction row
                    justify-content space-between
                    overflow hidden
                    height 29px
                    .time,.views,.orgin
                        align-self flex-end
                        font-size 12px
                        color #aaa
                        overflow hidden
    .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
.slide-enter-active,.slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
