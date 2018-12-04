import styled from 'styled-components';

const Dog = styled.div`
	background: white;
	border: 1px solid ${(props) => props.theme.offWhite};
	box-shadow: ${(props) => props.theme.bs};
	position: relative;
	display: flex;
	flex-direction: column;
	img {
		width: 100%;
		height: 400px;
		object-fit: cover;
	}
	p {
		font-size: 12px;
		line-height: 15;
		font-weight: 300;
		flex-grow: 1;
		padding: 0 3rem;
		font-size: 1.5rem;
	}
	.buttonList {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		border-top: 1px solid ${(props) => props.theme.lightgrey};
		border-right: 1px solid ${(props) => props.theme.lightgrey};

		background: ${(props) => props.theme.white};
		& > * {
			background: white;
			border: 0;
			font-size: 2rem;
			padding: 0rem;
			position: center;
		}
	}
`;

export default Dog;
