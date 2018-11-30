import styled from 'styled-components';

const Name = styled.h3`
	margin: 0 1rem;
	text-align: center;
	transform: skew(0deg) rotate(0deg);
	margin-top: -9rem;
	text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
	a {
		background: ${(props) => props.theme.lightRed};
		display: inline;
		line-height: 10;
		font-size: 2rem;
		text-align: center;
		color: ${(props) => props.theme.cream};
		padding: 0 1rem;
	}
`;

export default Name;
