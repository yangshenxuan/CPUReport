const api = process.env.VUE_APP_URL_BASE_API;

export function getWebglUrl(href, userId, username, isexam, eId) {
  const params =
    "userId=" +
    userId +
    "&username=" +
    username +
    "&isexam=" +
    isexam +
    "&maxScore=" +
    eId.maxScore +
    "&seq=" +
    eId.seq +
    eId.appId
      ? "&appId=" + eId.appId
      : "";
  return href + "?" + encodeURI(params);
}
export const simulationList = [
  {
    id:1,
    name:'阿托伐他汀',
    imgsrc: '',
    seq:1,
    score:100,
    href:api + "/zgykdxyatftt/u3d/index.html",
    training:api + '/zgykdxyatftt/u3d/index.html'
  }
]