const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['to-do', 'in progress', 'done'], default: 'to-do' },
  dueDate: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
});

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;