const hostname = window && window.location && window.location.hostname
const port = (hostname === 'localhost') ? '8080' : ''
const protocol = (hostname === 'localhost') ? 'http' : 'https' 

const routes = {
  basepath: `${protocol}://${hostname}:${port}/api/`,
  users: {
    create: 'users',
    get: 'users'
  }
};

export default routes;
