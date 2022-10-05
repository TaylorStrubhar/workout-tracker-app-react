const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required: 'You need to add a name for your exercise!',
    minlength: 1,
    maxlength: 50,
  },
  exerciseCategory: {
    type: String,
    required: 'You need to assign a category to your exercise!',
    minlength: 1,
    maxlength: 50,
  },
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
