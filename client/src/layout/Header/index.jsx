import React from 'react';
import styles from './Header.module.css';
import Logo from '../../assets/Logo.png';
import Link from '../../components/Link';

export default function Header() {
	return (
		<header className={styles.container}>
			<img className={styles.menuLogo} src={Logo} alt="Logo" />
			<div className={styles.menuLinks}>
				<ul className={styles.menuItems}>
					<li className={styles.menuItem}>
						<Link>Organizações de contato</Link>
					</li>
					<li className={styles.menuItem}>
						<Link>Adoção</Link>
					</li>
					<li className={styles.menuItem}>
						<Link>Contato</Link>
					</li>
				</ul>
				<div className={styles.divider}></div>
				<div className={styles.menuAccount}>
					<Link href="/login">Fazer login</Link>
					<button className={styles.registerBtn}>
						<Link href="/register">Criar conta</Link>
					</button>
				</div>
			</div>
		</header>
	);
}
