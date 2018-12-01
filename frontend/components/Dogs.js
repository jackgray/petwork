import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Dog from './Dog';

const ALL_DOGS_QUERY = gql`
	query ALL_DOGS_QUERY {
		dogs {
			id
			name
			breed
		}
	}
`;

const Center = styled.div`text-align: center;`;
const DogsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
	margin: 0 auto;
`;

class Dogs extends Component {
	render() {
		return (
			<Center>
				<p>Dogs go here</p>
				<Query query={ALL_DOGS_QUERY}>
					{({ data, error, loading }) => {
						if (loading) return <p>Loading...</p>;
						if (error) return <p>Error: {error.message}</p>;
						return <DogsList>{data.dogs.map((dog) => <Dog dog={dog} key={dog.id} />)}</DogsList>;
					}}
				</Query>
			</Center>
		);
	}
}

export default Dogs;
export { ALL_DOGS_QUERY };
