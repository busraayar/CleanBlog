const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Post = require('./models/Post');

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

// ROUTES
app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/post', (req, res) => {
  res.render('post');
});
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/addPost', (req, res) => {
  res.render('addPost');
});
app.post('/posts', async (req, res) => {
  // async - await yapısı kullanacğız.
  await Post.create(req.body); // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`sunucu ${port} portunda başlatıldı`);
});
