import SinglePet from '../components/SinglePet';

const Pet = (props) => (
	<div>
		<p>This is the pet page</p>
		<SinglePet id={props.query.id} />
	</div>
);

export default Pet;
