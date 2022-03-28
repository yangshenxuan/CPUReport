import request from '@/utils/request'

//科目列表
export function subjectList(data){
  return request({
    url:'/subject/list.do',
    method:'post',
    data
  })
}

//科目添加
export function addSubject(data){
  return request({
    url:'/subject/add.do',
    method:'post',
    data
  })
}

//科目修改
export function updSubject (data){
  return request({
    url:'/subject/update.do',
    method:'post',
    data
  })
}

//科目删除
export function delSubject(data){
  return request({
    url:'/subject/delete.do',
    method:'post',
    data
  })
}