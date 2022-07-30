const homeController = {
  renderHomepage: (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn });
  },

  renderLogin: (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
    }
    res.render('login');
  }
};

module.exports = homeController;
