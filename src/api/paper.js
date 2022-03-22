import request from '@/utils/request'

//试卷列表
export function paperList(data){
  return request({
    url:'/testPaper/list.do',
    method:'post',
    data
  })
}

//创建试卷
export function addPaper(data){
  return request({
    url:'/testPaper/add.do',
    method:'post',
    data
  })
}

//修改试卷
export function updPaper(data){
  return request({
    url:'/testPaper/update.do',
    method:'post',
    data
  })
}

//删除试卷
export function delPaper(data){
  return request({
    url:'/testPaper/delete.do',
    method:'post',
    data
  })
}

export function paperOver(data){
  return request({
    url:'/testPaper/over.do',
    method:'post',
    data
  })
}

export function paperStart(data){
  return request({
    url:'/testPaper/start.do',
    method:'post',
    data
  })
}

//试卷题目列表
export function paperQuestionList(data){
  return request({
    url:'/testPaper/questionList.do',
    method:'post',
    data
  })
}

//添加试卷题目
export function addPaperQuestion(data){
  return request({
    url:'/testPaper/questionAdd.do',
    method:'post',
    data
  })
}

//编辑试卷题目
export function editPaperQuestion(data){
  return request({
    url:'/testPaper/questionUpdate.do',
    method:'post',
    data
  })
}

//删除试卷题目
export function delPaperQuestion(data){
  return request({
    url:'/testPaper/questionDelete.do',
    method:'post',
    data
  })
}

//答案提交
export function testSubmit(data){
  return request({
    url:'/testPaper/result.do',
    method:'post',
    data
  })
}