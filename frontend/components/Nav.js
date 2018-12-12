import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => {
	return (
		<NavStyles>
			<Link href="/pets">
				<a>Pets</a>
			</Link>
			<Link href="/adopt">
				<a>Adopt</a>
			</Link>
			<Link href="/add">
				<a>Create Listing</a>
			</Link>
			<Link href="/favorites">
				<a>Favorites</a>
			</Link>
			<Link href="/inquiries">
				<a>Inquiries</a>
			</Link>
			<Link href="/about">
				<a>About</a>
			</Link>
			<Link href="/contact">
				<a>Contact</a>
			</Link>
		</NavStyles>
	);
};

export default Nav;
