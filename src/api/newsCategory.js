/* eslint-disable */
import axios from 'axios'
import { SERVER_NAME } from './config'

export function getNewsCategory (page = 0,size = 14) {
    const url = SERVER_NAME + '/category'
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
