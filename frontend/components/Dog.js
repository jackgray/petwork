import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Name from './styles/Name';
import DogStyles from './styles/DogStyles';
import PriceTag from './styles/PriceTag';

class Dog extends Component {
	render() {
		const { dog } = this.props;
		return (
			<DogStyles>
				{dog.image && <img src={dog.image} alt={dog.name} />}
				<Name>
					<Link
						href={{
							pathname: '/dog',
							query: { id: dog.id }
						}}
					>
						<a href="">{dog.name}</a>
					</Link>
				</Name>
				<p>{dog.age}</p>
				<div className="buttonList">
					<Link
						href={{
							pathname: '/update',
							query: { id: dog.id }
						}}
					>
						<a>✏️</a>
					</Link>
					<button>❤️</button>
				</div>
			</DogStyles>
		);
	}
}

export default Dog;

/*


    render() {
		const { dog } = this.props;
		return (
			<DogStyles>
				{dog.image && <img src={dog.image} alt={dog.name} />}
				<Name>
					<Link
						href={{
							pathname: '/dog',
							query: { id: dog.id }
						}}
					>
						<a href="">{dog.name}</a>
					</Link>
				</Name>
				<p>{dog.age}</p>
				<div className="buttonList">
					<Link
						href={{
							pathname: '/update',
							query: { id: dog.id }
						}}
					>
						<a>✏️</a>
					</Link>
					<button>❤️</button>
				</div>
			</DogStyles>
		);
	}*/

/*
	render() {
		const { dog } = this.props;
		return (
			<Row>
				<Col sm="6">
					<Card body>
						<CardTitle>
							<Name>
								<Link
									href={{
										pathname: '/dog',
										query: {
											id: dog.id
										}
									}}
								>
									<a>{dog.name}</a>
								</Link>
							</Name>
						</CardTitle>
						<CardText>{dog.age}</CardText>
						<Button>❤️</Button>
					</Card>
				</Col>
			</Row>
		);
	}
}
*/
