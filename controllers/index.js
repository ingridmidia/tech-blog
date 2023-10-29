const router = require('express').Router();
const { User, Post, Comment } = require("../models");

router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({ include: [{ model: User }] });
    const posts = postsData.map(post => {
      return post.get({ plain: true })
    });
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, { include: [{ model: User }] });
    const post = postData.get({ plain: true });
    const commentsData = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [{ model: User }]
    });
    const comments = commentsData.map(comment => {
      return comment.get({ plain: true })
    });
    res.render('post', { post, comments });
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;
