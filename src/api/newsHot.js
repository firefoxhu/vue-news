/* eslint-disable */
import axios from 'axios'
import { SERVER_NAME } from './config'
/** 轮播图 */
export function getNewsHotSlider () {
  return {
    slider: [
      {
        picUrl: 'http://luosen365.com/image/20180330/1522381768045.png'
      },
      {
        picUrl: 'http://luosen365.com/image/20180330/1522381769276.png'
      },
      {
        picUrl: 'http://luosen365.com/image/20180330/1522381860204.png'
      }
    ]
  }
}

/** 热点推荐列表 */
export function getNewsHotList (page = 0, size = 8) {

  const url = SERVER_NAME + 'news/recommend'
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

/**根据类型获取列表 */
export function getNewsByCategoryId(typeid, page = 0, size = 8) {
  const url = SERVER_NAME + 'news/category'
  const data = Object.assign({}, {
    page: page,
    size: size,
    typeId: typeid
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    console.log(e)
  })
}
