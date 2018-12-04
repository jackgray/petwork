import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Head from 'next/head';
import Error from './ErrorMessage';

const SingleDogStyles = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${(props) => props.theme.bs}
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 80px;
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
							<img src={dog.largeImage} alt={dog.name} />
						</SingleDogStyles>
					);
				}}
			</Query>
		);
	}
}

export default SingleDog;
export { SINGLE_DOG_QUERY };