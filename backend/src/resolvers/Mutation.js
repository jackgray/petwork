const Mutations = {
	async createDog(parent, args, ctx, info) {
		// TODO: check if user is logged in

		const dog = await ctx.db.mutation.createDog(
			{
				data: {
					...args
				}
			},
			info
		);
		return dog;
	},
	updateDog(parent, args, ctx, info) {
		// make a copy of new fields
		const updates = { ...args };
		// remove ID from the updates (don't update ID)
		delete updates.id;
		// run update method
		return ctx.db.mutation.updateDog({
			data: updates,
			where: {
				id: args.id
			},
			info
		});
	},
	async deleteDog(parent, args, ctx, info) {
		const where = { id: args.id };
		//1. find the item
		const dog = await ctx.db.query.dog({ where }, `{id name}`);
		// check for permissions
		// delete listing
		return ctx.db.mutation.deleteDog({ where }, info);
	}
};

module.exports = Mutations;
