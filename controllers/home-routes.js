const router = require('express').Router();
const { User, Post, Comment } = require("../models");

// GET all posts for homepage
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

// GET one post
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

// Login route
router.get("/login", async (req, res) => {
    res.render("login");
});

// Sign up route
router.get("/signup", async (req, res) => {
    res.render("signup");
});

// Dashboard route
router.get("/dashboard", async (req, res) => {
    res.render("dashboard")
});

// Create new post
router.get("/new-post", async (req, res) => {
    res.render("newPost");
});

module.exports = router;