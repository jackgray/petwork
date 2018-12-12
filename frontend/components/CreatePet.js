import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { ALL_PETS_QUERY } from './Pets';

const CREATE_PET_MUTATION = gql`
	mutation CREATE_PET_MUTATION(
		$name: String!
		$age: Int
		$breed: String
		$image: String
		$largeImage: String
		$location: String
		$shelter: String
	) {
		createPet(
			name: $name
			age: $age
			breed: $breed
			image: $image
			largeImage: $largeImage
			location: $location
			shelter: $shelter
		) {
			id
		}
	}
`;

class CreatePet extends Component {
	state = {
		name: '',
		age: '',
		gender: '',
		breed: '',
		image: '',
		largeImage: '',
		location: '',
		shelter: ''
	};
	handleChange = (e) => {
		const { name, type, value } = e.target;

		const val =

				type === 'number' ? parseFloat(value) :
				value;
		this.setState({ [name]: val });
	};

	uploadFile = async (e) => {
		console.log('Uploading file...');
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'default');

		const res = await fetch(
			'https://api.cloudinary.com/v1_1/petwork/image/upload',
			{
				method: 'POST',
				body: data
			}
		);
		const file = await res.json();
		console.log(file);
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url
		});
	};

	update = (cache, payload) => {
		// deletePet removes listing from the SERVER
		// udate will update the cache to sync the client side
		// 1. Read the cache
		const data = cache.readQuery({ query: ALL_PETS_QUERY });
		console.log(data);

		cache.writeQuery({ query: ALL_PETS_QUERY, data });
	};

	render() {
		return (
			<Mutation
				mutation={CREATE_PET_MUTATION}
				variables={this.state}
				update={this.update}
			>
				{(createPet, { loading, error }) => (
					<Form
						onSubmit={async (e) => {
							e.preventDefault();
							const res = await createPet();
							console.log(res);
							Router.push({
								pathname: '/pets',
								query: { id: res.data.createPet.id }
							});
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="file">
								Image
								<input
									type="file"
									id="file"
									name="file"
									placeholder="Upload an image"
									required
									onChange={this.uploadFile}
								/>
								{this.state.image && (
									<img
										width="200"
										src={this.state.image}
										alt="Upload Preview"
									/>
								)}
							</label>
							<label htmlFor="name">
								Name
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Name"
									required
									value={this.state.name}
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
							{/* <label className="switch" htmlFor="breed">
								Gender
								<input
									type="checkbox"
									id="gender"
									name="gender"
									required
									value={this.state.gender}
									onChange={this.handleChange}
								/>
								<span class="slider round" />
							</label> */}
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
							<label htmlFor="location">
								Location
								<input
									type="text"
									id="location"
									name="location"
									placeholder="Location"
									required
									value={this.state.location}
									onChange={this.handleChange}
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default CreatePet;
export { CREATE_PET_MUTATION };
