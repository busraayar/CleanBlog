const Post = require('../models/Post');

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getPostPage = (req, res) => {
  res.render('post');
};

exports.getAddPostPage = (req, res) => {
  res.render('addPost');
};
