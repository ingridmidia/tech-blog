const router = require('express').Router();
const { Post } = require('../../models');

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

module.exports = router;