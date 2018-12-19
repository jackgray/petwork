const { forwardTo } = require('prisma-binding');

const Query = {
	pets: forwardTo('db'),
	pet: forwardTo('db'),
	petsConnection: forwardTo('db'),
	me(parent, args, ctx, info) {
		if (!ctx.request.userId) {
			return null;
		}
		return ctx.db.query.user(
			{
				where: { id: ctx.request.userId }
			},
			info
		);
	},
	async users(parents, args, ctx, info) {
		// 1. check if user is logged in
		if (!ctx.request.userId) {
			throw new Error('You must be logged in!');
		}
		console.log(ctx.request.userId);
		// 2. checks if user has permission to query all users
		hasPermission(ctx.request.user, [ 'ADMIN', 'PERMISSIONUPDATE' ]);

		// 3. query all users if user has ADMIN privileges
		return ctx.db.query.users({}, info);
	},
	async favorites(parents, args, ctx, info) {
		// 1. Authorize loggin
		if (!ctx.request.userId) {
			throw new Error('You arent logged in!');
		}
		// 2. Query list of favorites
		const favorites = await ctx.db.query.favorites(
			{
				where: { id: args.id }
			},
			info
		);
		// 3. Check if user has permissions
		const ownsFavorites = favorites.user.id === ctx.request.userId;
		const hasFavoritesPermission = ctx.request.user.permissions.inclues(
			'ADMIN'
		);
		if (!ownsFavorites || !hasPermission) {
			throw new Error('You do not have permission');
		}
		return favorites;
	}
};

module.exports = Query;
