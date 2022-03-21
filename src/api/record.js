import request from '@/utils/request'

//实验记录列表
export function recordList(data){
  return request({
    url:'/experiment/list.do',
    method:'post',
    data
  })
}

//实验操作日志
export function findLog(data){
  return request({
    url:'/experiment/log.do',
    method:'post',
    data
  })
}