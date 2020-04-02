
const POST = 'POST';
const GET = 'GET';

const hostname = window && window.location && window.location.hostname
const port = (hostname === 'localhost') ? '8080' : ''
const protocol = (hostname === 'localhost') ? 'http' : 'https' 

const routes = {
  basepath: `${protocol}://${hostname}:${port}/api/`,
  users: {
    create: 'users',
    get: 'users-get'
  }
};

const isSuccessful = (status) => !!(status >= 200 && status < 300)

const createRequest = (method, data = {}, contentType) => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': contentType === 'multipart' 
      ? '' 
      : 'application/json',
  },
  redirect: 'follow',
  body: contentType === 'multipart' ? data : JSON.stringify(data)
  // credentials: 'include'
  // mode: 'no-cors',
})

const execFetch = (uri, request, cb) => {
  const response = {};

  return fetch(uri, request)
    .then(res => {
      response.status = res.status
      return res.text()
    }).then(res => {
      const jsonData = res === '' ? null : JSON.parse(res)
      if (cb) cb(null, jsonData, response.status)
    })
    .catch(err => cb(err))
}

const execFetchPromise = (uri, request) => {
  return fetch(uri, request)
}

export default {
  users: {
    create: (user, cb = () => {}) => {
      const uri = `${routes.basepath}${routes.users.create}`

      return execFetch(
        uri, 
        createRequest(POST, user, null), 
        (err, data, status) => {
          cb(err, !isSuccessful(status) ? null : data)
        })
    },
    get: (filter = {}, cb = () => {}) => {
      const uri = `${routes.basepath}${routes.users.get}`

      return execFetch(
        uri, 
        createRequest(POST, filter, null), 
        (err, data, status) => {
          cb(err, !isSuccessful(status) ? null : data)
        })
    },
    getPromise: (filter = {}, cb = () => {}) => {
      const uri = `${routes.basepath}${routes.users.get}`

      return execFetchPromise(uri, createRequest(POST, filter, null))
    }, 
  }
}