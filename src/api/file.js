import request from '@/utils/request'

//文件上传替换
export function upload(data){
  return request({
    url:'/file/upload.do',
    method:'post',
    headers:{'Content-Type' : 'multipart/form-data;charset=utf-8'},
    data
  })
}

//返回上传文件的url
export function downloadUrl(fid){
 return `${process.env.VUE_APP_BASE_API}/file/download.do?fid=${fid}`
}