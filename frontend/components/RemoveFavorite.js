import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { FAVORITE_PETS_QUERY } from './Favorites';

const REMOVE_FAVORITE_MUTATION = gql`
	mutation removeFavorite($id: ID!) {
		removeFavorite(id: $id) {
			id
		}
	}
`;

class RemoveFavorite extends Component {
	update = (cache, payload) => {
		console.log('update function called');
		const data = cache.readQuery({ query: FAVORITE_PETS_QUERY });
		console.log(data);
		data.me.favorites = data.me.favorites.filter(
			(favorite) => favorite.id !== payload.data.removeFavorite.id
		);

		cache.writeQuery({ query: FAVORITE_PETS_QUERY, data });
	};
	render() {
		const id = this.props.id;
		return (
			<Mutation
				mutation={REMOVE_FAVORITE_MUTATION}
				variables={{ id }}
				update={this.update}
			>
				{(removeFavorite, { error }) => (
					<button
						onClick={() => {
							if (
								confirm(
									'Are you sure you want to unfavorite this pet?'
								)
							) {
								removeFavorite();
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

export default RemoveFavorite;
export { REMOVE_FAVORITE_MUTATION };
