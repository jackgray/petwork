import Dogs from '../components/Dogs';

const Home = (props) => (
	<div>
		<Dogs page={props.query.page} />
	</div>
);

export default Home;
