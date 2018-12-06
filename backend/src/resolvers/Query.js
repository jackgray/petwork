const { forwardTo } = require('prisma-binding');

const Query = {
	dogs: forwardTo('db'),
	dog: forwardTo('db'),
	// async dogs(parent, args, ctx, info) {
	// 	const dogs = await ctx.db.query.dogs();
	// 	return dogs;
	// }
	dogsConnection: forwardTo('db')
};

module.exports = Query;
