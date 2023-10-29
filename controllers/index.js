const router = require('express').Router();
const { User, Post } = require("../models");

router.get('/', async (req, res) => {
  try {
    const postsData = await Post.findAll({ include: [{ model: User }] });
    const posts = postsData.map(post => {
      return post.get({ plain: true })
    })
    console.log(posts);
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
