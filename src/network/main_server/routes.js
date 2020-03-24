const hostname = window && window.location && window.location.hostname;
const port = (hostname === 'localhost') ? '8080' : '';

const routes = {
  basepath: `http://${hostname}:${port}/api/`,
  users: {
    create: 'users'
  }
};

export default routes;
