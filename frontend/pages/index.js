import Pets from '../components/Pets';

const Home = (props) => (
	<div>
		<Pets page={parseFloat(props.query.page) || 1} />
	</div>
);

export default Home;
