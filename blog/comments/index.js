'use strict';
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { randomBytes } = require('crypto');

const commentsByPostID = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostID[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentID = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostID[req.params.id] || [];
  comments.push({
    id: commentID,
    content
  });

  commentsByPostID[commentID] = comments;
  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Running on port 4001');
});
