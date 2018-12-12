import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';

const SinglePetStyles = styled.div`
	max-width: 600px;
	max-height: 100px;
	margin: 2rem auto;
	box-shadow: ${(props) => props.theme.bs}
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: row;
	min-height: 800px;
	img {
		width:100%;
		height: 100%;
		max-height: 600px;
		object-fit: contain;
	}
	.details {
		margin: 3rem;
		font-size: 2rem;
	}
`;

const SINGLE_PET_QUERY = gql`
	query SINGLE_PET_QUERY($id: ID!) {
		pet(where: { id: $id }) {
			id
			name
			breed
			age
			gender
			location
			largeImage
		}
	}
`;

class SinglePet extends Component {
	render() {
		return (
			<Query query={SINGLE_PET_QUERY} variables={{ id: this.props.id }}>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <p>Loading...</p>;
					if (!data.pet)
						return <p>Single Pet Component{this.props.id}</p>;
					const pet = data.pet;
					return (
						<SinglePetStyles>
							<Head>
								<title>Petwork | {pet.name}</title>
							</Head>
							<img src={pet.largeImage} alt={pet.name} />
							<div>
								<h2 className="details">{pet.name}</h2>
								<p>{pet.age}</p>
							</div>
						</SinglePetStyles>
					);
				}}
			</Query>
		);
	}
}

export default SinglePet;
export { SINGLE_PET_QUERY };
