import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
//import { perPage } from '../../../finished-application/frontend/config';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		dogsConnection {
			aggregate {
				count
			}
		}
	}
`;

const Pagination = (props) => (
	<PaginationStyles>
		<Query query={PAGINATION_QUERY}>
			{({ data, loading, error }) => {
				if (loading) return <p>Loading...</p>;
				const count = data.dogsConnection.aggregate.count;
				const pages = Math.ceil(count / perPage);
				return <p>Page 1 of {pages}</p>;
			}}
		</Query>
	</PaginationStyles>
);

export default Pagination;
