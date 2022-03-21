import request from '@/utils/request'

//实验评语列表
export function findRemark(data){
  return request({
    url:'/setup/list.do',
    method:'post',
    data
  })
}

//修改实验评语
export function updateRemark(data){
  return request({
    url:'/setup/update.do',
    method:'post',
    data
  })
}

//实验评分比例列表
export function findExperiment(data){
  return request({
    url:'/setup/list.do',
    method:'post',
    data
  })
}

//修改实验评分比例
export function updateExperiment(data){
  return request({
    url:'/setup/update.do',
    method:'post',
    data
  })
}