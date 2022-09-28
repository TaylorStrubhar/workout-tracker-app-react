const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
  exerciseType: {
    type: String,
    required: 'You need to add a name for your exercise!',
    minlength: 1,
    maxlength: 280,
  },
  exerciseWeight: {
    type: Number,
    required: 'You need to add how much weight was used!',
  },
  exerciseReps: {
    type: Number,
    required: 'You need to add how many reps you did!',
  },
  exerciseSet: {
    type: Number,
    required: 'You need to add how many sets you did!',
  },
});

module.exports = exerciseSchema;
