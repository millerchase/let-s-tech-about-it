const { Post, User, Comment } = require('../models');

const dashboardController = {
  getAllPosts: (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: ['id', 'post_url', 'title', 'post_body', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
          ],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbPostData => {
        // serialize the data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getSinglePost: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_url', 'title', 'post_body', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: [
            'id',
            'comment_text',
            'post_id',
            'user_id',
            'created_at'
          ],
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    })
      .then(dbPostData => {
        // serialize the data before passing to template
        if (!dbPostData) {
          res.status(400).json({ message: 'No post found with this id' });
        }

        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = dashboardController;
