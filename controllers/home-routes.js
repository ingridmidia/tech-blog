const router = require('express').Router();
const { User, Post, Comment } = require("../models");

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        const postsData = await Post.findAll({ include: [{ model: User }] });
        const posts = postsData.map(post => {
            return post.get({ plain: true })
        });
        res.render('home', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    };
});

// GET one post
router.get("/post/:id", async (req, res) => {
    if (req.session.logged_in) {
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
            res.render('post', { post, comments, logged_in: req.session.logged_in });
        } catch (err) {
            res.status(500).json(err);
        };
    } else {
        res.redirect("/login");
    }
});

// Login route
router.get("/login", async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login', { logged_in: req.session.logged_in });
});

// Sign up route
router.get("/signup", async (req, res) => {
    res.render("signup", { logged_in: req.session.logged_in });
});

// Dashboard route
router.get("/dashboard", async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect("login");
    } else {
        try {
            const postsData = await Post.findAll({
                where: { user_id: req.session.user_id },
                include: [{ model: User }]
            });
            const posts = postsData.map(post => {
                return post.get({ plain: true })
            });
            res.render('dashboard', { posts, logged_in: req.session.logged_in });
        } catch (err) {
            res.status(500).json(err);
        };
    }
});

// Create new post
router.get("/new-post", async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect("login");
    } else {
        res.render("newPost", { logged_in: req.session.logged_in });
    }
});

// Update a post
router.get("/update-post/:id", async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect("login");
    } else {
        try {
            const postData = await Post.findByPk(req.params.id);
            const post = postData.get({ plain: true });
            res.render("updatePost", { post, logged_in: req.session.logged_in });
        } catch (err) {
            res.status(500).json(err);
        };
    }
});

module.exports = router;