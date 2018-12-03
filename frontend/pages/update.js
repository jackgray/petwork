import UpdateDog from '../components/UpdateDog';

const Update = ({ query }) => (
	<div>
		<UpdateDog id={query.id} />
	</div>
);

export default Update;
