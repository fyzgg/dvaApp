import { ajax } from 'jquery';

function checkStatus(response) {
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
export default function request(url, options={body:'{}',methods:'get'}) {
  console.log(options)
  const data = {};
  ajax({
    url: url,
    async:false,
    type: options.methods,
    data: JSON.parse(options.body),
  })
  .done(function(response){
    data.data = response;
  })
  .fail(function(response) {
    checkStatus(response);
    console.log("error");
  }) 
  return data;
}