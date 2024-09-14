const express = require('express');
const app = express();
const port = 3000;

let { 
  getArticles, 
  getArticleById, 
  getComments, 
  getCommentById, 
  getUserById 
} = require('./data.js');

app.get("/", (req ,res) => {
  try{
     return res.status(200).json({ message: "Helllo" })
  } catch (error){
    return res.status(500).json({ message : "error" })
  }
})

// Exercise 1: Get All Articles
app.get('/articles', async (req, res) => {
  try {
    let response = await getArticles();
    if (response.length === 0) {
      return res.status(404).json({ error: 'No articles found' });
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({error: 'Internal Server Error' });
  }
});

// Exercise 2: Get Article by ID
app.get('/articles/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await getArticleById(id);
    if (!response) return res.status(404).json({ error: 'Article not found' });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Exercise 3: Get All Comments
app.get('/comments', async (req, res) => {
  try {
    let response = await getComments();
    if (response.length === 0) {
      return res.status(404).json({ error: 'No comments found'});
    }
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error:'Internal Server Error' });
  }
});

// Exercise 4: Get Comment by ID
app.get('/comments/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await getCommentById(id);
    if (!response) return res.status(404).json({ error: 'Comment not found' });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Exercise 5: Get User by ID
app.get('/users/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let response = await getUserById(id);
    if (!response) return res.status(404).json({ error: 'User not found'});
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = { app };
