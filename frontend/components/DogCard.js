import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		maxWidth: 345
	},
	media: {
		height: 140
	}
};

class DogCard extends React.Component {
	render() {
		const { classes } = this.props;
		const { dog } = this.props;
		return (
			<Card className={classes.card}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={dog.image}
						title={dog.name}
					/>

					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
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
						</Typography>
						<Typography component="p">{dog.age}</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button size="small" color="primary">
						❤️
					</Button>
					<Button size="small" color="primary" />

					<Button size="small" color="primary">
						Learn More
					</Button>
				</CardActions>
			</Card>
		);
	}
}

DogCard.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DogCard);
