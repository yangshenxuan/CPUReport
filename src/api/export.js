const baseUrl = process.env.VUE_APP_BASE_API
export function getExport(params){
  let exportUrl = baseUrl
  + '/experiment/recordExport.do'
  +'?isexam='
  + params.isexam
  if(params.userId > 0){
    exportUrl = exportUrl
    + "&userId="
    + params.userId
  }
  return exportUrl
}

export function getReply(params){
  let replyUrl = baseUrl
  + '/testPaper/recordExport.do'
  if(params.userId > 0 && params.tpId > 0){
    replyUrl = replyUrl
    + "?userId="
    + params.userId
    + "&tpId="
    +params.tpId
  } else if(params.userId >0){
    replyUrl = replyUrl + "?userId=" + params.userId
  }else if(params.tpId > 0 ){
    replyUrl = replyUrl + "?tpId=" + params.tpId
  }
  return replyUrl
}