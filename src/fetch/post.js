import 'whatwg-fetch';
import 'es6-promise';

// 根据对象拼接成 key1=val1&key2=val2&key3=val3 的字符串形式
function obj2params(obj) {
  var result = '';
  var item;
  for (item in obj) {
    result += '&' + item + '=' + encodeURIComponent(obj[item]);
  }

  if (result) {
    result = result.splice(1);
  }

  return result;
}

// 发送 post 请求
export function post(url, paramsObj) {
  var result = fetch(url, {
    method: 'POST',
    credentails: 'include',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: obj2params(paramsObj)
  });

  return result;
}
