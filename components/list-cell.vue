<template>
        <view class="list-cell Flex-sb">
                <image class="img" :src="item.hotelImg" mode="widthFix" v-if="item.hotelImg"></image>
				<image src="https://cdn.colourfulchina.com/nwsh/static/images/default.png" class="img" mode="widthFix" v-else></image>
                <view class="des">
                        <text class="title">{{item.showName}}</text>
                        <text class="subtitle">{{item.hotelAddress}}</text>
                        <!-- <view class="discount">
                                <discount-label type="sm">6期免息</discount-label>
                                <discount-label type="sm">领150减10</discount-label>
                        </view> -->
                        <!-- <view class="price">
                                <text class="num">¥246</text>
                                <text class="old-num">¥348</text>
                        </view> -->
                </view>
        </view>
</template>

<script>
        import discountLabel from './discount-label.vue'
        export default {
                name: 'listCell',
                props:["item"],
                data() {
                        return {
                                
                        };
                },
                components: {
                        discountLabel
                }
        }
</script>

<style lang="scss" scoped>
.list-cell {
        background: $uni-bg-color;
        border-radius: 12rpx;
        width: 686rpx;
        height: 256rpx;
        padding: $uni-padding-30 $uni-padding-20;
        margin-bottom: $uni-margin-20;
        .img {
                width: 240rpx;
                height: 192rpx;
                flex: 0 0 auto;
                margin-right: $uni-margin-20;
        }
        .des {
                display: flex;
                flex: 1;
                flex-direction: column;
                .title {
                        font-size: $uni-font-size-base;
                        color: $uni-font-color-goods;
                        font-weight: bold;
                        margin-bottom: $uni-margin-10;
                }
                .subtitle {
                        font-size: 26rpx;
                        color: $uni-font-color-goods;
                        margin-bottom: $uni-margin-10;
                }
                .price {
                        margin-top: $uni-margin-20;
                        .num {
                                font-size: $uni-font-size-base;
                                color: $uni-color-price;
                                margin-right: 8rpx;
                        }
                        .old-num {
                                text-decoration: line-through;
                                color: #9D9D9E;
                                font-size: 22rpx;
                        }
                }
                
        }
}
</style>