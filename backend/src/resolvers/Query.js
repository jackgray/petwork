const { forwardTo } = require('prisma-binding');

const Query = {
	pets: forwardTo('db'),
	pet: forwardTo('db'),
	// async pets(parent, args, ctx, info) {
	// 	const pets = await ctx.db.query.pets();
	// 	return pets;
	// }
	petsConnection: forwardTo('db')
};

module.exports = Query;
