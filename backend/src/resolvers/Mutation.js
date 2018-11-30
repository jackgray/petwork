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
	}
};

module.exports = Mutations;
