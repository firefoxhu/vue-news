<template>
    <div class="news-cateogy-container">
        <scroll ref="scroll" class="scroll" :data="categoryList" :pullup="pullup" @scrollToEnd="downMore">
            <ul>
                <li @click="selectItem(item)" v-for="(item, index) in categoryList" :key="index" >
                    <div class="item">
                        <div class="icon">
                            <img  v-lazy='item.imgUrl' alt="">
                        </div>
                        <div class="desc">
                            <h3 v-html="item.title">冰箱</h3>
                            <p>
                                {{ item.num }}个常见技巧
                            </p>
                        </div>
                    </div>
                </li>
                <loading v-show="hasMore" title=""></loading>
            </ul>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script style="text/ecmascript-6">
/* eslint-disable */
import { getNewsCategory } from 'api/newsCategory'
import Scroll from 'base/scroll/scroll'
import { RESPONSE_CODE } from 'api/config'
import { mapMutations } from 'vuex'
import Loading from 'base/loading/loading'
const  size = 14
export default {
    data() {
        return {
            page: 0,
            pullup: true,
            categoryList: [],
            hasMore: true
        }
    },
    created() {
        this._getCategory()
    },
    methods: {
        selectItem (item) {
            this.$router.push({
                path: `newsCategory/${item.id}`,
            })
            this.setNews(item)
        },
        downMore() {
            if (!this.hasMore) {
                return
            }
            this.page++
            getNewsCategory(this.page, this.size).then((res) => {
                if (res.code === RESPONSE_CODE) {
                    this.categoryList = res.data.list
                    this.hasMore = res.data.hasNext
                }
            })           
        },
        _getCategory() {
            this.page = 0
            this.hasMore = true
            getNewsCategory(this.page, this.size).then((res) => {
                if (res.code === RESPONSE_CODE) {
                    this.categoryList = res.data.list
                    this.hasMore = res.data.hasNext
                }
            })
        },
        ...mapMutations({
            setNews: 'SET_NEWS'
        })
    },
    components: {
        Scroll,
        Loading
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
.news-cateogy-container
    position: fixed
    background-color #ffffff
    width: 100%
    top: 84px
    bottom: 0
    .scroll
        height 100%
        width 100%
        overflow hidden
    ul
        padding 0 5px
        display flex
        flex-flow wrap
        justify-content space-between
        overflow hidden
        li
            margin 5px 0
            border 1px solid #1234
            border-radius 5px
            width 48%
            height 80px
            display flex
            align-items center
            overflow hidden
            .item
                display flex
                flex-direction row
                align-items top
                overflow hidden
                .icon
                    flex 1
                    height 80px
                    width 120px
                    overflow hidden
                    img 
                        width 100%
                        height 100%
                        padding 2px 2px
                .desc
                    overflow hidden
                    padding-left 5px
                    flex 1
                    flex-direction column
                    p
                        font-size 12px
                        color #cccccc
                    
    
</style>