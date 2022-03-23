import request from "@/utils/request";

//获取所有评论
export function commentList(data) {
  return request({
    url: "/comment/list.do",
    method: "post",
    data,
  });
}

//添加评论回复
export function addCom (data) {
  return request({
    url: '/comment/addComment.do',
    method: 'post',
    data
  })
}

//删除评论回复
export function delCom(data) {
  return request({
    url: "/comment/delComment.do",
    method: "post",
    data,
  });
}
