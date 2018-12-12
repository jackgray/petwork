/*
	PetsPage is currently redundant as the Pets
	component is currently the only component
	in the root page
*/

import Link from 'next/link';
import Pets from '../components/Pets';

const PetsPage = (props) => (
	<div>
		<Pets page={props.query.page || 1} />
	</div>
);

export default PetsPage;
