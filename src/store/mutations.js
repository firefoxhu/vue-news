/* eslint-disable */
import * as types from './mutation-types'
const matutaions = {
    [types.SET_NEWS](state, news) {
        state.news = news
    },
    [types.SET_SHOP](state, shop) {
        state.shop = shop
    }
}
export default matutaions