let articles = [
  { id: 1, title: 'Introduction to JavaScript', author: 'Jane Smith' },
  { id: 2, title: 'Advanced CSS Techniques', author: 'Tom Brown' },
];

let comments = [{ id: 1, articleId: 1, content: 'Very informative article!' }];

let users = [{ id: 1, name: 'Alice Johnson', email: 'alice@example.com' }];

let getArticles = () => {
  return articles;
};

let getArticleById = (id) => {
  return articles.find((article) => article.id === id);
};

let getComments = () => {
  return comments;
};

let getCommentById = (id) => {
  return comments.find((e) => e.id === id);
};

let getUserById = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = {
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
  getUserById,
};
