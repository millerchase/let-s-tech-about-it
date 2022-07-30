const homeController = {
  renderHomepage: (req, res) => {
    res.render('homepage');
  },

  renderLogin: (req, res) => {
    res.render('login');
  }
};

module.exports = homeController;
