const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
  const page = req.query.page || 1; //başlangıç sayfası veya hangi sayfada olduğumuz belirtir
  const photoPerPage = 2; //Her sayfada kaç veri listelememiz gerektiğini tutan degisken
  const totalPhotos = await Post.find().countDocuments(); //database de bulunan toplam veri sayısını tutan degisken

  const posts = await Post.find({}) //Tüm verileri listele
    .sort('-dateCreated') //tüm verileri parametrede belirtilene göre sırala
    .skip((page - 1) * photoPerPage) //pass geçmemiz gereken veri sayısı ve gerekli method
    .limit(photoPerPage); //sayfa kaç veri listelenmeli
  console.log(req.query);

  res.render('index', {
    posts: posts,
    pages: Math.ceil(totalPhotos / photoPerPage),
    current: page,
  });
  // const posts = await Post.find({});
  // res.render('index', {
  //  posts,
  //  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.title = req.body.title;
  post.detail = req.body.detail;
  await post.save();
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
