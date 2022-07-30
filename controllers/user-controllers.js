const { User } = require('../models');

const userController = {
  getAllUsers: (req, res) => {
    User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_url', 'created_at']
        }
      ]
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getUserById: (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_url', 'created_at']
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }

        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createUser: (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json(dbUserData);
        });
      })
      .catch(err => res.status(400).json(err));
  },

  updateUser: (req, res) => {
    User.update(req.body, {
      where: {
        id: req.params.id
      },
      indvidualHooks: true
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser: (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  loginUser: (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with that email address!' });
          return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
        }

        req.session.save(() => {
          // declare session variables
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json({ user: dbUserData });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  logoutUser: (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.json({ message: 'You have been logged out!' });
      });
    } else {
      res.json({ message: 'No user to log out!' });
    }
  }
};

module.exports = userController;
