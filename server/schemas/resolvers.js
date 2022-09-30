const {AuthenticationError} = require('apollo-server-express');
const {User, Routine, Exercise} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({_id: context.user._id})
          .select('-__v -password')
          .populate('routines')
          .populate('exercises');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('routines')
        .populate('exercises');
    },
    user: async (parent, {username}) => {
      return User.findOne({username})
        .select('-__v -password')
        .populate('routines')
        .populate('exercises');
    },
    routines: async (parent, {username}) => {
      const params = username ? {username} : {};
      return Routine.find(params).sort({createdAt: -1});
    },
    routine: async (parent, {_id}) => {
      return Routine.findOne({_id});
    }
},

  Mutation: {
    login: async (parent, {email, password}) => {
      const user = await User.findOne({email});

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return {token, user};
    },
    addUser: async (parent, {username, email, password}) => {
      const user = await User.create({username, email, password});
      const token = signToken(user);

      return {token, user};
    },
    addRoutine: async (parent, args, { routineData }, context) => {
      if (context.user) {
        const newRoutine = await Routine.create(
          {routineName: `${args.routineName}`},
          {exercises: { ...routineData }}
        );
        const savedRoutine = await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {routines: newRoutine._id}},
          {new: true}
        );

        return savedRoutine;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addExercise: async (parent, args, context) => {
      console.log({...args});
      if (context.user) {
        const exercise = await Exercise.create({...args});

        await User.findByIdAndUpdate(
          {_id: context.user._id},
          {$push: {exercises: exercise}},
          {new: true}
        );

        return exercise;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;