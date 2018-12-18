import UpdatePet from '../components/UpdatePet';

const Update = ({ query }) => (
	<div>
		<UpdatePet id={query.id} />
	</div>
);

export default Update;
