import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';

const CREATE_DOG_MUTATION = gql`
	mutation CREATE_DOG_MUTATION(
		$name: String!
		$location: String
		$age: Int
		$breed: String
		$image: String
		$shelter: String
	) {
		createDog(
			name: $name
			location: $location
			age: $age
			breed: $breed
			image: $image
			shelter: $shelter
		) {
			id
		}
	}
`;

class CreateDog extends Component {
	state = {
		name: 'Scooby',
		age: '11',
		breed: 'Great Dane',
		image: 'dog.jpg'
	};
	handleChange = (e) => {
		const { name, type, value } = e.target;

		const val =

				type === 'number' ? parseFloat(value) :
				value;
		this.setState({ [name]: val });
	};
	render() {
		return (
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					console.log(this.state);
				}}
			>
				<fieldset>
					<label htmlFor="name">
						Name
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Name"
							required
							value={this.state.firstName}
							onChange={this.handleChange}
						/>
					</label>

					<label htmlFor="age">
						Age
						<input
							type="number"
							id="age"
							name="age"
							placeholder="Age"
							required
							value={this.state.age}
							onChange={this.handleChange}
						/>
					</label>
					<label htmlFor="breed">
						Breed(s)
						<input
							type="text"
							id="breed"
							name="breed"
							placeholder="Breed"
							required
							value={this.state.breed}
							onChange={this.handleChange}
						/>
					</label>
					<button type="submit">Submit</button>
				</fieldset>
			</Form>
		);
	}
}

export default CreateDog;
export { CREATE_DOG_MUTATION };
