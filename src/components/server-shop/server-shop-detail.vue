<template>
    <transition name="slide">
        <div class="shop-detail-container">
            <div class="top-bar">
                <div class="back" @click="back">
                    <i class="icon-back"></i>
                </div>
                <p class="title">门店详情</p>
            </div>
            <scroll ref="scroll" class="scroll" :pullup="pullup" @scrollToEnd="resizeHeight">
                <div class="shop-content">

                    <p>门店名称：<span class="shop-name">{{shop.shopName}}</span></p>
                    <p>专业师傅：<span class="shop-name">{{shop.userName}}</span></p>
                    <p>预约电话：<span class="shop-name">{{shop.phone}}</span> <button @click="makePhone(shop.phone)">联系师傅</button></p>
                    <p>是否上门：<span class="shop-name">上门服务</span></p>
                    <p><span class="device"></span> 门店：</p>

                    <ul class="list-images">
                        <li class="icon"><img v-lazy="shop.picture[0]"/></li>
                        <li class="icon"><img v-lazy="shop.picture[1]"/></li>
                        <li class="icon"><img v-lazy="shop.picture[2]"/></li>
                    </ul>
                    <p>
                        <span class="address">{{shop.address}} - {{shop.street}}</span>
                    </p>
                    <div class="amap-page-container" style="height:200px">
                        <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin">
                            <el-amap-info-window  :position="mywindow.position" :content="mywindow.content" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>
                            <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
                            <el-amap-circle :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity" :events="circle.events" :strokeColor="circle.strokeColor" :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor"></el-amap-circle>
                        </el-amap>
                    </div>
                    <p><span class="device"></span> 介绍：{{shop.description}}</p>
                    <div style="height:44px;"></div>
                </div>
            </scroll>
        </div>
    </transition>
</template>
<script style="text/ecmascript-6">
import {mapGetters} from 'vuex'
import Scroll from 'base/scroll/scroll'
/* eslint-disable */
export default {
    data () {
        return {
            pullup: true,
            zoom: 12,
            center: null,
            circle: {
                clickable: true,
                center: null,
                radius: 200,
                fillOpacity: 0.3,
                strokeStyle: 'dashed',
                fillColor: '#FFFF00',
                strokeColor: '#00BFFF'
            },
            marker: {
                position: null,
                events: {
                    click: () => {
                        
                        if(!this.mywindow.visible) {
                            return
                        }

                        if (this.mywindow.visible === true) {
                            this.mywindow.visible = false
                        } else {
                            this.mywindow.visible = true
                        }
                    },
                    dragend: (e) => {
                        this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
                    }
                },
                visible: true,
                draggable: false
            },
            mywindow: {
                position: null,
                content: '<h4>信阳罗森家电维修</div>',
                visible: true,
                events: {
                    close () {
                        if(!this.mywindow.visible) {
                            return
                        }

                        this.mywindow.visible = false

                    }
                }
            },
            plugin: {
                    pName: 'Scale',
                    events: {
                        init (instance) {
                            console.log(instance)
                        }
                    }
            }
        }
    },
    computed: {
        ...mapGetters([
            'shop'
        ])
    },
    created(){
        if(!this.shop.id){
            this.$router.push({
                path: '/serverShop'
            })
            return
        }

        this._initMap()

        setTimeout(() => {
            if (!this.$refs.scroll) {
                return
            }
            this.$refs.scroll.refresh()
        }, 500)

        
    },
    methods: {
        _initMap () {
            this.center = [Number(this.shop.x).toFixed(8),Number(this.shop.y).toFixed(8)]
            this.circle.center = this.center
            this.marker.position = this.center
            this.mywindow.position = this.center
            this.mywindow.content = '<h4>'+this.shop.shopName+'</div>'
        },
        back () {
            this.$router.back()
        },
        makePhone(phone) {
            window.location.href = 'tel://'+phone
        },
        resizeHeight () {
            if (!this.$refs.scroll) {
                return
            } 
            this.$refs.scroll.refresh()
        }
    },
    components: {
        Scroll
    }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~common/stylus/variable"
*
    margin 0
    padding 0
.shop-detail-container
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
            align-self center
    .scroll
        height 100%
        overflow hidden
        .shop-content
            display flex
            flex-direction column
            margin 0 5px
            .shop-name
                font-weight bolder
                font-size 14px
            .device
                border-left 8px solid #ccc
                margin-right 5px
            .list-images
                display flex
                flex-direction row
                padding 0 8px
                .icon
                    flex 1
                    img 
                        width 100%
            .address:before
                height 15px
                width 15px
                content url(addr.png)
                vertical-align middle
                display inline-block

.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>