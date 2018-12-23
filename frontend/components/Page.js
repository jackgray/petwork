import React, { Component } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';

const theme = {
	red: '#38a8ff',
	black: '#393939',
	grey: '#3A3A3A',
	lightgrey: '#E1E1E1',
	lightblue: '#54dfff',
	torquiose: '#3dfff2',
	lightRed: '#38a8ff',
	offWhite: '#fcfcfc',
	cream: '#fffdf2',
	maxWidth: '1000px',
	bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const StyledPage = styled.div`
	background: ${(props) => props.theme.offWhite};
	color: black;
`;

const Inner = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	padding: 2rem;
	background: ${(props) => props.theme.offWhite};
`;

injectGlobal`
	@font-face {
		font-family: 'radnika_next';
		src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
		font-weight: normal;
		font-style: light;
	}
	html {
		box-sizing: border-box;
		font-size: 8px;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}
	body {
		padding: 0;
		margin: 0;
		font-size: 1.5rem;
		line-height: 2;
		font-family: 'radnika_next';
	}
	a {
		text-decoration: none;
		color: ${theme.black}
	}
`;

// for injectGlobal, if theme def were not in this file
// it would have to be refactored into its own file and
// imported back in to have access to its props

class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<Inner>{this.props.children}</Inner>
				</StyledPage>
			</ThemeProvider>
		);
	}
}

export default Page;
