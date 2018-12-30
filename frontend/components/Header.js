import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';

Router.onRouteChangeStart = () => {
	NProgress.start();
};

Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};

const Logo = styled.h1`
	font-size: 3rem;
	margin-left: 2rem;
	position: relative;
	z-index: 2;
	transform: 0;
	a {
		padding: 0.5rem 1rem;
		background: ${(props) => props.theme.cream};
		color: ${(props) => props.theme.primary};
		text-transform: full-width;
		text-decoration: none;
		font-size: 5rem;
	}
	p {
		padding: 0.5rem 1rem;
		background: ${(props) => props.theme.offWhite};
		color: ${(props) => props.theme.primary};
		text-transform: full-width;
		text-decoration: none;
	}
	@media (max-width: 1300px) {
		margin: 0;
		text-align: center;
	}
`;

const StyledHeader = styled.header`
	.bar {
		border-bottom: 10px solid ${(props) => props.theme.primary};
		display: grid;
		grid-template-columns: auto 1fr;
		justiify-content: space-between;
		align-items: stretch;
		@media (max-width: 1300px) {
			grid-template-columns: 1fr;
			justify-content: center;
		}
	}
	.sub-bar {
		display: grid;
		grid-template-columns: 1fr auto;
		border-bottom: 1px solid ${(props) => props.theme.black};
	}
`;

const Header = (props) => {
	return (
		<StyledHeader>
			<div className="bar">
				<Logo>
					<Link href="/">
						<a>Petwork</a>
					</Link>
					<p>the pet adoption network</p>
				</Logo>
				<Nav />
			</div>
			<div className="sub-bar">
				<p>Search</p>
			</div>
		</StyledHeader>
	);
};

export default Header;
