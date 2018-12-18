import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
//import { perPage } from '../../../finished-application/frontend/config';
import { perPage } from '../config';
import Head from 'next/head';
import Link from 'next/link';

const PAGINATION_QUERY = gql`
	query PAGINATION_QUERY {
		petsConnection {
			aggregate {
				count
			}
		}
	}
`;

const Pagination = (props) => (
	<Query query={PAGINATION_QUERY}>
		{({ data, loading, error }) => {
			if (loading) return <p>Loading...</p>;
			const count = data.petsConnection.aggregate.count;
			const pages = Math.ceil(count / perPage);
			const page = parseInt(props.page, 10);

			return (
				<PaginationStyles>
					<Head>
						<title>
							Petwork | Page {page} of {pages}
						</title>
					</Head>
					<Link
						prefetch
						href={{
							pathname: 'pets',
							query: { page: page - 1 }
						}}
					>
						<a className="prev" aria-disabled={page <= 1}>
							👈
						</a>
					</Link>
					<p>
						{props.page} of{' '}
						<span className="totalPages">{pages}</span>
					</p>
					<p>Showing {count} Results</p>
					<Link
						prefetch
						href={{
							pathname: 'pets',
							query: { page: page + 1 }
						}}
					>
						<a className="next" aria-disabled={page >= pages}>
							👉
						</a>
					</Link>
				</PaginationStyles>
			);
		}}
	</Query>
);

export default Pagination;
export { PAGINATION_QUERY };
