// react components imported automatically by next.js
// by default next.js wraps entire application in a component
import Link from 'next/link';
import CreateDog from '../components/CreateDog';
import Form from '../components/styles/Form';

const List = (props) => (
	<Form>
		<fieldset>
			<label htmlFor="name">
				Name <input type="text" id="name" name="name" placeholder="Name" required />
			</label>
		</fieldset>
	</Form>
);

export default List;
