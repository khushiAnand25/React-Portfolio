import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import menuIcon from "../../assets/nav/menuicon.png";
import closeIcon from "../../assets/nav/closeicon.png";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="#home">Portfolio</a>

      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={menuOpen ? closeIcon : menuIcon}
          alt="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        <ul className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/certificates" onClick={() => setMenuOpen(false)}>Certificates</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
