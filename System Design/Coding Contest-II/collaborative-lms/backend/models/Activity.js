const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  type: { type: String, enum: ['comment', 'lesson_complete', 'course_enroll', 'course_created', 'lesson_created'], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  description: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);