import moment from "moment";

export function getTimestamp(time){
  return (new Date(time)).getTime() /1000
}

export function dateFmt(time,formatString = 'YYYY-MM-DD'){
  return moment(time).format(formatString)
}
