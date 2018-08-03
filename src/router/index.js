/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import NewsHot from 'components/news-hot/news-hot'
import NewsDetail from 'components/news-detail/news-detail'
import NewsCategory from 'components/news-category/news-category'
import CategoryList from 'components/category-list/category-list'
import ServerShop from 'components/server-shop/server-shop'
import ServerShopDetail from 'components/server-shop/server-shop-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/newsHot'
    },
    {
      path: '/newsHot',
      component: NewsHot,
      children: [
        {
          path: ':id',
          component: NewsDetail
        }
      ]
    },
    {
      path: '/newsCategory',
      component: NewsCategory,
      children: [
        {
          path: ':id',
          component: CategoryList,
          children: [
            {
              path: ':id',
              component: NewsDetail
            }
          ]
        }
      ]
    },
    {
      path: '/serverShop',
      component: ServerShop,
      children: [
        {
          path: ':id',
          component: ServerShopDetail
        }
      ]
    }
  ]
})
