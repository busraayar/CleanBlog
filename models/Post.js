const moongose = require('mongoose');
const Schema = moongose.Schema;

const PostSchema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = moongose.model('Post', PostSchema);

module.exports = Post;
