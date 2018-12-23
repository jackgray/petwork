import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import styled from 'styled-components';
import Pagination from './Pagination';
import { perPage } from '../config';
import User from './User';
import Pet from './Pet';
import Pets from './Pets';
import CartStyles from './styles/CartStyles';
import { link } from 'next/link';

const FAVORITE_PETS_QUERY = gql`
	query FAVORITE_PETS_QUERY {
		me {
			favorites {
				id
				name
				image
				breed
				age
				location
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
						const favorites = data.me.favorites;
						console.log('loading favorite pets...');
						console.log(favorites.id);
						return (
							<PetsList>
								{favorites.map((pet) => (
									<Pet pet={pet} key={pet.id} />
								))}
							</PetsList>
						);
					}}
				</Query>
			</Center>
		);
	}
}

export default Favorites;
export { FAVORITE_PETS_QUERY };
