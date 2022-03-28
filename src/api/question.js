import request from '@/utils/request'

//题目列表
export function questionList(data){
  return request({
    url:'/question/list.do',
    method:'post',
    data
  })
}

//添加题目
export function addQuestion(data){
  return request({
    url:'/question/add.do',
    method:'post',
    data
  })
}

//修改题目
export function updQuestion (data){
  return request({
    url:'/question/update.do',
    method:'post',
    data
  })
}

//题目详情
export  function detQuestion(data){
  return request({
    url:'/question/detail.do',
    method:'post',
    data
  })
}

//删除题目
export function delQuestion(data){
  return request({
    url:'/question/delete.do',
    method:'post',
    data
  })
}