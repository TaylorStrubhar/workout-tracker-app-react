const { Schema, model } = require('mongoose');
const exerciseSchema = require('./Exercise');
const dateFormat = require('../utils/dateFormat');

const routineSchema = new Schema(
    {
      routineName: {
        type: String,
        required: 'You need to add a name for your workout routine!',
        minlength: 1,
        maxlength: 280
      }, 
      createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
      },
      username: {
        type: String,
        required: true
      },
      exercise: [
        {
          type: Schema.Types.ObjectId,
          ref: "Exercise"
        }
      ]
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const Routine = model('Routine', routineSchema);

module.exports = Routine;