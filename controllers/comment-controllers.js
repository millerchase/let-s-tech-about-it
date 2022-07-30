const { Comment, User, Post } = require('../models');

const commentController = {
  getAllComments: (req, res) => {
    Comment.findAll({
      attributes: ['id', 'comment_text', 'user_id', 'post_id']
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createComment: (req, res) => {
    Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.error(err);
        res.status(400).json(err);
      });
  },

  deleteComment: (req, res) => {
    Comment.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbCommentData => {
        if (!dbCommentData) {
          res.status(404).json({ message: 'No comment found with this id' });
          return;
        }
        res.json(dbCommentData);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  }
};

module.exports = commentController;
