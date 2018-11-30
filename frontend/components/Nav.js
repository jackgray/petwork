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
			<Link href="/list">
				<a>List</a>
			</Link>
			<Link href="/favorites">
				<a>Favorites</a>
			</Link>
			<Link href="/inquiries">
				<a>Inquiries</a>
			</Link>
		</NavStyles>
	);
};

export default Nav;
