import fetch from 'dva/fetch';

function parseJSON(response) {
  console.error(response)
  return response.json();
}

function checkStatus(response) {
  console.info(response.body)
  console.info(response.json())
  console.info(response.text())
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
/*
async function request (url,options){
  const response = await fetch(url,options);
  console.log(response)
  checkStatus(response);
  const data = await response.json();
  console.log(response.json())
  const ret = {
    data,
    headers:{}
  };
  if(response.headers.get('x-total-count')){
    ret.headers['x-total-count'] = response.headers.get('x-total-count');
  }
  return ret;
}

export default request;*/