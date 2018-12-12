import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_PET_QUERY = gql`
	query SINGLE_PET_QUERY($id: ID!) {
		pet(where: { id: $id }) {
			id
			name
			age
			breed
			image
			largeImage
			location
			shelter
		}
	}
`;

const UPDATE_PET_MUTATION = gql`
	mutation UPDATE_PET_MUTATION(
		$id: ID
		$name: String
		$age: Int
		$breed: String
		$image: String
		$largeImage: String
		$location: String
		$shelter: String
	) {
		updatePet(
			id: $id
			name: $name
			age: $age
			breed: $breed
			image: $image
			largeImage: $largeImage
			location: $location
			shelter: $shelter
		) {
			id
			name
			age
			breed
			image
			largeImage
			location
			shelter
		}
	}
`;

class UpdatePet extends Component {
	state = {};
	handleChange = (e) => {
		const { name, type, value } = e.target;

		const val =

				type === 'number' ? parseFloat(value) :
				value;
		this.setState({ [name]: val });
	};

	updatePet = async (e, updatePetMutation) => {
		e.preventDefault();
		console.log('Updating Pet');
		console.log(this.state);
		const res = await updatePetMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		console.log('Updated!');
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
		console.log('Updated!');
	};

	render() {
		return (
			<Query query={SINGLE_PET_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (!data.pet)
						return (
							<p>No pet found in database for {this.props.id}</p>
						);
					return (
						<Mutation
							mutation={UPDATE_PET_MUTATION}
							variables={this.state}
						>
							{(updatePet, { loading, error }) => (
								<Form
									onSubmit={(e) =>
										this.updatePet(e, updatePet)}
								>
									<Error error={error} />
									<fieldset
										disabled={loading}
										aria-busy={loading}
									>
										<label htmlFor="file">
											Image
											<input
												type="file"
												id="file"
												name="file"
												placeholder="Upload an image"
												deaultValue={data.pet.image}
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
												defaultValue={data.pet.name}
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
												defaultValue={data.pet.age}
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
												defaultValue={data.pet.breed}
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
												defaultValue={data.pet.location}
												onChange={this.handleChange}
											/>
										</label>
										<button type="submit">
											Save Changes
										</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}

export default UpdatePet;
export { UPDATE_PET_MUTATION };
