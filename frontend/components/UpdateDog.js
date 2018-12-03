import React, { Component } from 'react';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SINGLE_DOG_QUERY = gql`
	query SINGLE_DOG_QUERY($id: ID!) {
		dog(where: { id: $id }) {
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

const UPDATE_DOG_MUTATION = gql`
	mutation UPDATE_DOG_MUTATION(
		$id: ID!
		$name: String!
		$age: Int
		$breed: String
		$image: String
		$largeImage: String
		$location: String
		$shelter: String
	) {
		updateDog(
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

class UpdateDog extends Component {
	state = {};
	handleChange = (e) => {
		const { name, type, value } = e.target;

		const val =

				type === 'number' ? parseFloat(value) :
				value;
		this.setState({ [name]: val });
	};

	updateDog = async (e, updateDogMutation) => {
		e.preventDefault();
		console.log('Updating Dog');
		console.log(this.state);
		const res = await updateDogMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
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
			<Query query={SINGLE_DOG_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (!data.dog)
						return (
							<p>No dog found in database for {this.props.id}</p>
						);
					return (
						<Mutation
							mutation={UPDATE_DOG_MUTATION}
							variables={this.state}
						>
							{(updateDog, { loading, error }) => (
								<Form
									onSubmit={(e) =>
										this.updateDog(e, updateDog)}
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
												deaultValue={data.dog.image}
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
												defaultValue={data.dog.name}
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
												defaultValue={data.dog.age}
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
												defaultValue={data.dog.breed}
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
												defaultValue={data.dog.location}
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

export default UpdateDog;
export { UPDATE_DOG_MUTATION };
