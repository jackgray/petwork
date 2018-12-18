import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Pet from './Pet';
import Pagination from './Pagination';
import { perPage } from '../config';
import { defaultCipherList } from 'constants';

const ALL_PETS_QUERY = gql`
	query ALL_PETS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
		pets(first: $first, skip: $skip, orderBy: createdAt_DESC) {
			id
			name
			age
			breed
			image
			largeImage
		}
	}
`;

const Center = styled.div`text-align: center;`;
const PetsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;

class Pets extends Component {
	render() {
		return (
			<Center>
				<Pagination page={this.props.page} />
				<Query
					query={ALL_PETS_QUERY}
					variables={{
						skip: this.props.page * perPage - perPage
					}}
				>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						return (
							<PetsList>
								{data.pets.map((pet) => (
									<Pet pet={pet} key={pet.id} />
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

export default Pets;
export { ALL_PETS_QUERY };
