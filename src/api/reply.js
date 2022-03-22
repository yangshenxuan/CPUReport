import request from '@/utils/request'

// 学习记录
export function findReply (data) {
  return request({
    url: '/learn/record.do',
    method: 'post',
    data
  })
}

// 添加学习记录
export function addReply (data) {
  return request({
    url: '/learn/add.do',
    method: 'post',
    data
  })
}

// 学习人数
export function replyNum (data) {
  return request({
    url: '/learn/person.do',
    method: 'post',
    data
  })
}
