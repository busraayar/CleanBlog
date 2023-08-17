const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override');
const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

// connect  DB
mongoose
  .connect('mongodb://localhost/cleanblog-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public')); // Static dosyaları koyacağımız klasörü seçtik
app.use(express.urlencoded({ extended: true })); // Body parser okuyoruz
app.use(express.json()); // Body parser dönüştürüyoruz
app.use(
  methodOverride('_method', {
    methods: ['GET', 'POST'],
  })
);

// ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/posts/edit/:id', pageController.getEditPage);
app.get('/about', pageController.getAboutPage);
app.get('/post', pageController.getPostPage);
app.get('/addPost', pageController.getAddPostPage);

const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
