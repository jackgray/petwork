import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_PETS_QUERY } from './Pets';

const DELTE_PET_MUTATION = gql`
	mutation DELTE_PET_MUTATION($id: ID!) {
		deletePet(id: $id) {
			id
		}
	}
`;

class DeletePet extends Component {
	update = (cache, payload) => {
		// deletePet removes listing from the SERVER
		// udate will update the cache to sync the client side
		// 1. Read the cache
		const data = cache.readQuery({ query: ALL_PETS_QUERY });
		console.log(data);
		// 2. Filter removed listing out of the page
		data.pets = data.pets.filter(
			(pet) => pet.id !== payload.data.deletePet.id
		);
		// 3. put the filtered data back
		cache.writeQuery({ query: ALL_PETS_QUERY, data });
	};
	render() {
		return (
			<Mutation
				mutation={DELTE_PET_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
			>
				{(deletePet, { error }) => (
					<button
						onClick={() => {
							if (
								confirm(
									'Are you sure you want to remove this listing?'
								)
							) {
								deletePet();
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}

export default DeletePet;
