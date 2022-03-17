export const getQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const search = window.location.href.split('?')[1] || '';
  const r = search.match(reg) || [];
  return r[2];
}