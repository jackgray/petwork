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
	render() {
		const { id } = this.props;
		return (
			<Mutation
				mutation={REMOVE_FAVORITE_MUTATION}
				variables={{ id }}
				refetchQueries={[
					{ query: CURRENT_USER_QUERY },
					{ query: FAVORITE_PETS_QUERY }
				]}
			>
				{(removeFavorite, { loading }) => (
					<button disabled={loading} onClick={removeFavorite}>
						{this.props.children}
						{loading && 'ing'}
					</button>
				)}
			</Mutation>
		);
	}
}

export default RemoveFavorite;
export { REMOVE_FAVORITE_MUTATION };
