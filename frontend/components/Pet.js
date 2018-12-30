import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Name from './styles/Name';
import PetStyles from './styles/PetStyles';
import PriceTag from './styles/PriceTag';
import DeletePet from './DeletePet';
import AddFavorite from './AddFavorite';
import RemoveFavorite from './RemoveFavorite';

class Pet extends Component {
	render() {
		const { pet } = this.props;
		return (
			<PetStyles>
				<Link
					href={{
						pathname: '/pet',
						query: { id: pet.id }
					}}
				>
					<a href="">
						{pet.image && <img src={pet.image} alt={pet.name} />}
					</a>
				</Link>

				<Name>
					<Link
						href={{
							pathname: '/pet',
							query: { id: pet.id }
						}}
					>
						<a href="">{pet.name}</a>
					</Link>
					<h6>Age: {pet.age}</h6>
					<h6>Breed: {pet.breed}</h6>
				</Name>

				<div className="buttonList">
					<Link
						href={{
							pathname: '/update',
							query: { id: pet.id }
						}}
					>
						<h6>✏️</h6>
					</Link>
					<AddFavorite id={pet.id}>❤️</AddFavorite>
					<RemoveFavorite id={pet.id}>💔</RemoveFavorite>
					<DeletePet id={pet.id}>✖️</DeletePet>
				</div>
			</PetStyles>
		);
	}
}

export default Pet;

/*


    render() {
		const { pet } = this.props;
		return (
			<PetStyles>
				{pet.image && <img src={pet.image} alt={pet.name} />}
				<Name>
					<Link
						href={{
							pathname: '/pet',
							query: { id: pet.id }
						}}
					>
						<a href="">{pet.name}</a>
					</Link>
				</Name>
				<p>{pet.age}</p>
				<div className="buttonList">
					<Link
						href={{
							pathname: '/update',
							query: { id: pet.id }
						}}
					>
						<a>✏️</a>
					</Link>
					<button>❤️</button>
				</div>
			</PetStyles>
		);
	}*/

/*
	render() {
		const { pet } = this.props;
		return (
			<Row>
				<Col sm="6">
					<Card body>
						<CardTitle>
							<Name>
								<Link
									href={{
										pathname: '/pet',
										query: {
											id: pet.id
										}
									}}
								>
									<a>{pet.name}</a>
								</Link>
							</Name>
						</CardTitle>
						<CardText>{pet.age}</CardText>
						<Button>❤️</Button>
					</Card>
				</Col>
			</Row>
		);
	}
}
*/
