import SingleDog from '../components/SingleDog';

const Dog = (props) => (
	<div>
		<p>This is the dog page</p>
		<SingleDog id={props.query.id} />
	</div>
);

export default Dog;
