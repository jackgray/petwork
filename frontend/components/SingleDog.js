import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';

const SingleDogStyles = styled.div`
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

const SINGLE_DOG_QUERY = gql`
	query SINGLE_DOG_QUERY($id: ID!) {
		dog(where: { id: $id }) {
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

class SingleDog extends Component {
	render() {
		return (
			<Query query={SINGLE_DOG_QUERY} variables={{ id: this.props.id }}>
				{({ error, loading, data }) => {
					if (error) return <Error error={error} />;
					if (loading) return <p>Loading...</p>;
					if (!data.dog)
						return <p>Single Dog Component{this.props.id}</p>;
					const dog = data.dog;
					return (
						<SingleDogStyles>
							<Head>
								<title>Petwork | {dog.name}</title>
							</Head>
							<img src={dog.largeImage} alt={dog.name} />
							<div>
								<h2 className="details">{dog.name}</h2>
								<p>{dog.age}</p>
							</div>
						</SingleDogStyles>
					);
				}}
			</Query>
		);
	}
}

export default SingleDog;
export { SINGLE_DOG_QUERY };
