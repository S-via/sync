const { User, Couple } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({
                    _id: context.user._id
                });
                return user;
            }
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email})
            if (!user) {
                throw new Error('not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error('not found')
            }

            const token = signToken(user);
            return { token, user };
        },
        signUp: async (parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user };
        }
    }

}
module.exports = resolvers;
