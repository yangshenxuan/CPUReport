import request from '@/utils/request'

//登录
export function login(data){
  return request({
    url:'/user/login.do',
    method:'post',
    data
  })
}

//添加用户/注册
export function addUser(data){
  return request({
    url:'/user/add.do',
    method:'post',
    data
  })
}

//更新用户
export function updUser(data){
  return request({
    url:'/user/update.do',
    method:'post',
    data
  })
}

//重置密码
export function resetPwd(data){
  return request({
    url:'/user/resetPwd.do',
    method:'post',
    data
  })
}

//用户列表
export function userList(data){
  return request({
    url:'/user/list.do',
    method:'post',
    data
  })
}

//用户详情
export function userDetail(data){
  return request({
    url:'/user/detail.do',
    method:'post',
    data
  })
}