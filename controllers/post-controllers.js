const { Post, User } = require('../models');

const postController = {
  getAllPosts: (req, res) => {
    Post.findAll({
      attributes: ['id', 'post_url', 'title', 'created_at'],
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
      .then(dbPostData => res.json(dbPostData))
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
      attributes: ['id', 'post_url', 'title', 'created_at'],
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
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addPost: (req, res) => {
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.session.user_id
    })
      .then(dbPostData => {
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updatePost: (req, res) => {
    Post.update(
      {
        title: req.body.title,
        post_body: req.body.post_body,
        post_url: req.body.post_url
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deletePost: (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};

module.exports = postController;
