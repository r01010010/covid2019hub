const path = require('path');

module.exports = {
  home: (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }
}