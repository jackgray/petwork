import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import styled from 'styled-components';
import Pagination from './Pagination';
import { perPage } from '../config';
import User from './User';
import CartStyles from './styles/CartStyles';

const FAVORITE_PETS_QUERY = gql`
	query FAVORITE_PETS_QUERY {
		favoritePets(orderBy: createdAt_DESC) {
			id
			user {
				id
			}
			pet {
				id
				species
				name
				breed
				age
			}
		}
	}
`;

// const USER_FAVORITEPETS_QUERY = gql`
// 	query USER_FAVORITEPETS_QUERY {
// 		favorites(orderBy: createdAt_DESC) {
// 			id
// 			createdAt
// 			pets {
// 				id
// 				species
// 				name
// 				breed
// 				age
// 				image
// 			}
// 		}
// 	}
// `;

const Center = styled.div`text-align: center;`;
const PetsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;

class Favorites extends Component {
	render() {
		return (
			<Center>
				<Pagination page={this.props.page} />
				<Query
					query={FAVORITE_PETS_QUERY}
					variables={
						({
							skip: this.props.page * perPage - perPage
						},
						{ id: this.props.id })
					}
				>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						const favoritePets = data.favoritePets;
						console.log('loading favorite pets...');
						return (
							<PetsList>
								{favoritePets.pet.map((pet) => (
									<Pet
										pet={favoritePets.pet}
										key={favoritePets.pet.id}
									/>
								))}
							</PetsList>
						);
					}}
				</Query>
				<Pagination page={this.props.page} />
			</Center>
		);
	}
}

export default Favorites;
export { FAVORITE_PETS_QUERY };
