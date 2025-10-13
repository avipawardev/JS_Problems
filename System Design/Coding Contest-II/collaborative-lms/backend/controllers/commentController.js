const Comment = require('../models/Comment');

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body, author: req.user._id });
    await comment.populate('author', 'name');
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ lesson: req.params.lessonId })
      .populate('author', 'name')
      .populate('replies');
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createComment, getComments };