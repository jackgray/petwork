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
	}
};

module.exports = Mutations;
