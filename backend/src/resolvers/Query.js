const { forwardTo } = require('prisma-binding');

const Query = {
	dogs: forwardTo('db')
	// async dogs(parent, args, ctx, info) {
	// 	const dogs = await ctx.db.query.dogs();
	// 	return dogs;
	// }
};

module.exports = Query;
