const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const postSeedData = require('./postSeedData.json');
const commentSeedData = require('./commentSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData);
    const post = await Post.bulkCreate(postSeedData);
    const comments = await Comment.bulkCreate(commentSeedData);

    process.exit(0);
};

seedDatabase();