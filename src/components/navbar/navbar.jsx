import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './navbar.module.css';
import twitterIcon from '../../assets/twitter.svg';
import facebookIcon from '../../assets/facebook.svg';
import googlePlus from '../../assets/google-plus.svg';
import vimeo from '../../assets/vimeo.svg';
import pinterest from '../../assets/pinterest.svg';
import { navLinks } from '../../fixtures/navLinks';

function Navbar() {
  const [isNavbar, setIsNavbar] = useState(false);
  const showNavbar = () => {
    setIsNavbar(!isNavbar);
    document.body.style.overflow = 'hidden';
  };
  const { pathname } = useLocation();

  const classes = {
    header: `${isNavbar ? styles['show-nav'] : styles['hide-nav']} h-100 col-lg-1`,
    button: `${styles['nav-btn']} d-lg-none `,
    routes: {
      '/': `d-block text-decoration-none ${styles['nav-item']} ${
        pathname === '/' ? styles.active : ''
      }`,

      '/newReservation': `d-block text-decoration-none ${styles['nav-item']} ${
        pathname === '/newReservation' ? styles.active : ''
      }`,

      '/reservations': `d-block text-decoration-none ${styles['nav-item']} ${
        pathname === '/reservations' ? styles.active : ''
      }`,

      '/newCar': `d-block text-decoration-none ${styles['nav-item']} ${
        pathname === '/newCar' ? styles.active : ''
      }`,

      '/deleteCar': `d-block text-decoration-none ${styles['nav-item']} ${
        pathname === '/deleteCar' ? styles.active : ''
      }`,
    },
  };

  return (
    <>
      <button type="button" className={classes.button} onClick={showNavbar}>
        <div className={styles['burger-btn-span']} />
        <div className={styles['burger-btn-span']} />
      </button>
      <header className={classes.header}>
        <nav className="d-flex flex-column justify-content-between h-100">
          <div className="d-flex flex-column ">
            <div className="text-center mt-4">
              <Link
                to="/"
                className="text-decoration-none text-color-414141 text-center"
                onClick={showNavbar}
              >
                <h1 id={`${styles.logo}`}>CARS</h1>
              </Link>
            </div>
            <ul className={`list-unstyled ${styles['nav-items']}`}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link to={link.route} className={classes.routes[link.route]} onClick={showNavbar}>
                    {link.name.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="list-unstyled d-flex justify-content-between">
              <li className={styles['icon-list-item']}>
                <img src={twitterIcon} alt="twitter icon" />
              </li>
              <li className={styles['icon-list-item']}>
                <img src={facebookIcon} alt="facebook icon" />
              </li>
              <li className={styles['icon-list-item']}>
                <img src={googlePlus} alt="google-plus" />
              </li>
              <li className={styles['icon-list-item']}>
                <img src={vimeo} alt="vimeo" />
              </li>
              <li className={styles['icon-list-item']}>
                <img src={pinterest} alt="pinterest" />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
