import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_DOGS_QUERY } from './Dogs';

const DELTE_DOG_MUTATION = gql`
	mutation DELTE_DOG_MUTATION($id: ID!) {
		deleteDog(id: $id) {
			id
		}
	}
`;

class DeleteDog extends Component {
	update = (cache, payload) => {
		// deleteDog removes listing from the SERVER
		// udate will update the cache to sync the client side
		// 1. Read the cache
		const data = cache.readQuery({ query: ALL_DOGS_QUERY });
		console.log(data);
		// 2. Filter removed listing out of the page
		data.dogs = data.dogs.filter(
			(dog) => dog.id !== payload.data.deleteDog.id
		);
		// 3. put the filtered data back
		cache.writeQuery({ query: ALL_DOGS_QUERY, data });
	};
	render() {
		return (
			<Mutation
				mutation={DELTE_DOG_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
			>
				{(deleteDog, { error }) => (
					<button
						onClick={() => {
							if (
								confirm(
									'Are you sure you want to remove this listing?'
								)
							) {
								deleteDog();
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

export default DeleteDog;
