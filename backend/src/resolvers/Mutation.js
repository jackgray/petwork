const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { hasPermission } = require('../utils');

const Mutations = {
	async createPet(parent, args, ctx, info) {
		// TODO: check if user is logged in

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
		// 2. Query the users favorites
		const [ existingFavoritePet ] = await ctx.db.query.favoritePets({
			where: {
				user: { id: userId },
				pet: { id: args.id }
			}
		});
		// 3. Check if pet is already added to favorites. If so, increment by 1
		if (existingFavoritePet) {
			console.log('This pet is already saved to favorites');
			return ctx.db.mutation.updateFavoritePet(
				{
					where: { id: existingFavoritePet.id },
					data: { quantity: existingFavoritePet.quantity + 1 }
				},
				info
			);
		}
		// 4. if pet not added as favorite, create connection
		return ctx.db.mutation.createFavoritePet(
			{
				data: {
					user: {
						connect: { id: userId }
					},
					pet: {
						connect: { id: args.id }
					}
				}
			},
			info
		);
	}
};

module.exports = Mutations;
