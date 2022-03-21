import request from '@/utils/request'

//添加实验报告
export function addTemplate(data){
  return request({
    url:'/experiment/report.do',
    method:'post',
    data
  })
}

//用户批量导入
export function userTemplate(data){
  return request({
    url:'/user/import.do',
    method:'post',
    headers:{ 'Content-Type':'multipart/form-data;charset=utf-8' },
    data
  })
}

//题库批量导入
export function questionTemplate(data){
  return request({
    url:'/question/import.do',
    method:'post',
    headers:{'  Content-Type':'multipart/form-data;charset=utf-8'},
    data 
  })
}