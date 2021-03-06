const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { hasPermission } = require('../utils');

const Mutations = {
	async createPet(parent, args, ctx, info) {
		// TODO: check if user is logged in
		const { userId } = ctx.request;
		const pet = await ctx.db.mutation.createPet(
			{
				data: {
					...args
				}
			},
			info
		);
		return pet;
	},
	updatePet(parent, args, ctx, info) {
		// make a copy of new fields
		const updates = { ...args };
		// remove ID from the updates (don't update ID)
		delete updates.id;
		// run update method
		return ctx.db.mutation.updatePet({
			data: updates,
			where: {
				id: args.id
			},
			info
		});
	},
	async deletePet(parent, args, ctx, info) {
		const where = { id: args.id };
		//1. find the item
		const pet = await ctx.db.query.pet({ where }, `{id name}`);
		// check for permissions
		// delete listing
		return ctx.db.mutation.deletePet({ where }, info);
	},
	async signup(parent, args, ctx, info) {
		// convert email to lowercase
		args.email = args.email.toLowerCase();
		// hash password
		const password = await bcrypt.hash(args.password, 10);
		// createUser in db
		const user = await ctx.db.mutation.createUser(
			{
				data: {
					...args,
					password,
					permissions: { set: [ 'USER' ] }
				}
			},
			info
		);
		// generate a JWT for user auth
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// set token as a cookie in res object
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 265 // 1 year
		});
		return user;
	},
	async signin(parent, { email, password }, ctx, info) {
		// 1. Try to match user to email given
		const user = await ctx.db.query.user({ where: { email } });
		if (!user) {
			throw new Error(
				`The email address ${email} does not have an account`
			);
		}
		// 2. Authenticate password
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new Error('Invalid Password :(');
		}
		// 3. Create token
		const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
		// 4. make token a cookie to store auth in browser
		ctx.response.cookie('token', token, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 365
		});
		return user;
	},
	async addFavorite(parent, args, ctx, info) {
		// 1. Check permissions
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error('Sign in or create an account to save favorites.');
		}

		connect = await ctx.db.mutation.updatePet({
			data: {
				favoritedBy: {
					connect: {
						id: userId
					}
				}
			},
			where: {
				id: args.id
			}
		});

		return connect;
	},
	async removeFavorite(parent, args, ctx, info) {
		// 1. Check permissions
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error('Sign in or create an account to save favorites.');
		}

		disconnect = await ctx.db.mutation.updatePet({
			data: {
				favoritedBy: {
					disconnect: {
						id: userId
					}
				}
			},
			where: {
				id: args.id
			}
		});

		return disconnect;
	},

	async toggleFavorite(parent, args, ctx, info) {
		const { userId } = ctx.request;
		if (!userId) {
			throw new Error('You must be signed in');
		}

		me = await ctx.db.query.me({
			data: {
				favorites: {
					where: {
						id: pet.id
					}
				}
			}
		});

		const exists = userId;

		connect = await ctx.db.mutation.updatePet({
			where: {
				id: args.id
			},
			data: {
				favoritedBy: {
					connect: { id: userId }
				}
			}
		});
		disconnect = await ctx.db.mutation.updatePet({
			where: { id: args.id },
			data: {
				favoritedBy: {
					disconnect: { id: userId }
				}
			}
		});
		return null;
	}
};

module.exports = Mutations;
