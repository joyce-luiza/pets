import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

import styles from './styles.module.css';

export default function BasePage() {
    return (
        <main className={styles.container}>
            <Header />
            <section className={styles.content}>
                <Outlet />
            </section>
        </main>
    );
}
