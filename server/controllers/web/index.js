const path = require('path');

const home = (req, res) => {
  console.log(__dirname)
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
};

module.exports = {
  home,
}
