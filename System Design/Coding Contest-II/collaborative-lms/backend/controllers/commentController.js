const Comment = require('../models/Comment');
const Activity = require('../models/Activity');
const Lesson = require('../models/Lesson');

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body, author: req.user._id });
    await comment.populate('author', 'name');
    
    if (req.body.parentComment) {
      await Comment.findByIdAndUpdate(req.body.parentComment, {
        $push: { replies: comment._id }
      });
    } else {
      await Lesson.findByIdAndUpdate(req.body.lesson, {
        $push: { comments: comment._id }
      });
    }
    
    const lesson = await Lesson.findById(req.body.lesson);
    await Activity.create({
      type: 'comment',
      user: req.user._id,
      course: lesson.course,
      lesson: lesson._id,
      description: `Commented on lesson: ${lesson.title}`
    });
    
    req.app.get('io').to(`lesson-${req.body.lesson}`).emit('comment_added', comment);
    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ 
      lesson: req.params.lessonId,
      parentComment: { $exists: false }
    })
      .populate('author', 'name')
      .populate({
        path: 'replies',
        populate: { path: 'author', select: 'name' }
      })
      .sort('createdAt');
    res.json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await Comment.findByIdAndDelete(req.params.id);
    req.app.get('io').to(`lesson-${comment.lesson}`).emit('comment_deleted', { commentId: req.params.id });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createComment, getComments, deleteComment };