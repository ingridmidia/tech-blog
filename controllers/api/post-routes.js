const router = require('express').Router();
const { Post } = require('../../models');

// Create a new post /api/post/
router.post("/", async (req, res) => {

    const newPostData = {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    }
    try {
        await Post.create(newPostData);

        res.status(201).end();

    } catch (err) {
        res.status(500).json('Error in creating new post');
    }
});

// Update a post /api/post/:id
router.post("/:id", async (req, res) => {
    const updatedPostData = {
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    }
    try {
        await Post.update(updatedPostData, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).end();
    } catch (err) {
        res.status(500).json('Error in updating new post');
    }
});

// Delete a post /api/post/:id
router.delete("/:id", async (req, res) => {
    try {
        await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.status(200).end();
    } catch (err) {
        res.status(500).json('Error in deleting post');
    }
});

module.exports = router;