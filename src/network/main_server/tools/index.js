const POST = 'POST';
const GET = 'GET';

const ajaxTo = (uri, method, data, contentType, cb) => {
  const response = {};
  const request = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    // mode: 'no-cors',
    redirect: 'follow',
    // credentials: 'include'
  };

  if (contentType === 'multipart') {
    request.body = data;
    request.headers['content-type'] = '';
  } else if (method !== GET) {
    request.body = JSON.stringify(data);
    // request.headers['Content-Type'] = 'x-www-form-urlencoded';
  }

  console.log('Request');
  console.log(JSON.stringify(request, null, true));

  // @TODO: Handle status erros & stuff
  // with loging, error reporting, etc.
  fetch(uri, request)
    .then(res => {
      response.status = res.status;
      return res.text();
    }).then(res => {
      const jsonData = res === '' ? null : JSON.parse(res);
      cb(null, jsonData, response.status);
    })
    .catch(err => cb(err));
};

const isSuccessful = (status) => !!(status >= 200 && status < 300);

export default {
  POST,
  GET,
  ajaxTo,
  isSuccessful
};

export {
  POST,
  GET,
  ajaxTo,
  isSuccessful
}
