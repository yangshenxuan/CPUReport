import axios from 'axios'
import { Message } from 'element-ui'
import qs from 'qs'
// import store from '@/store'
// import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 2000, // request timeout
  transformRequest: [
    // function (data) {
    //   return qs.stringify(data)
    // }
    function (data,config) {         //function(data,header)  config是指头部信息
      // 如果没有额外设置请求头的时候，直接返回一个用连接的序列话结果
      if(!config['Content-Type']) return qs.stringify(data);
      switch(config['Content-Type'].toLowerCase()) {
          // 返回得到一个对象（可以为Json或一个数组）
          case 'application/json;charset=utf-8':{
              return JSON.stringify(data);
          }
          // 如果当前发送的是formData属性的配置时，直接将当前的data返回，不做任何处理（默认当前请求头的内容为formData格式）
          case 'multipart/form-data;charset=utf-8':{
              return data;
          }
          // 默认返回qs序列化后的内容，防止内容没有进行处理
          default:{
              return qs.stringify(data)
          }
      }
    }
  ]
})
// request interceptor 设置请求拦截器
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 获取token
    // if (store.getters.token) {
    //   config.headers.Authentication = store.getters.token
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


// response interceptor 返回拦截器
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 返回值code为0成功
    if (res.code !== 0) {
      if (response.config.url == '/user/login.do' && res.code == 4) {
        Message({
          message: '账号或密码错误',
          type: 'error',
          duration: 3 * 1000
        })
        return
      }
      if (response.config.url == '/question/delete.do' && res.code == 8) {
        Message({
          message: res.msg || '有试卷在使用！',
          type: 'error',
          duration: 3 * 1000
        })
        return
      }

      Message({
        message: res.msg || '访问错误',
        type: 'error',
        duration: 3 * 1000
      })

      return Promise.reject(new Error(res.msg || '访问错误'))
    } else {
      // 成功返回数据
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '连接错误',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
