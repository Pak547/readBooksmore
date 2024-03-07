// schemas/resolvers.js
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select('-__v -password');
      }
      throw new Error('Not logged in');
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
  }

module.exports = resolvers;
