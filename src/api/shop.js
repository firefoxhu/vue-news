/* eslint-disable */
import axios from 'axios'
import { SERVER_NAME } from './config'

/** 热点推荐列表 */
export function getShopList (page = 0, size = 6) {

    const url = SERVER_NAME + '/shop'
    const data = Object.assign({}, {
      page: page,
      size: size
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    }).catch((e) => {
      console.log(e)
    })
  }