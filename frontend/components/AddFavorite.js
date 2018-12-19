import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_FAVORITE_MUTATION = gql`
	mutation addFavorite($id: ID!) {
		addFavorite(id: $id) {
			id
		}
	}
`;

class AddFavorite extends Component {
	render() {
		const { id } = this.props;
		return (
			<Mutation
				mutation={ADD_FAVORITE_MUTATION}
				variables={{ id }}
				refetchQueries={[ { query: CURRENT_USER_QUERY } ]}
			>
				{(addFavorite, { loading }) => (
					<button disabled={loading} onClick={addFavorite}>
						{this.props.children}
						{loading && 'ing'}
					</button>
				)}
			</Mutation>
		);
	}
}

export default AddFavorite;
export { ADD_FAVORITE_MUTATION };
