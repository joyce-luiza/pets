import React from "react";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>
          <a href="">Home</a>
        </li>
        <li>
          <a href="">Organizações de resgate</a>
        </li>
        <li>
          <a href="">Pets</a>
        </li>
        <li>
          <a href="">Contato</a>
        </li>
      </ul>
      <ul>
        <li>
          <i className="ri-facebook-circle-fill ri-2x"></i>
        </li>
        <li>
          <i className="ri-twitter-fill ri-2x"></i>
        </li>
        <li>
          <i className="ri-instagram-fill ri-2x"></i>
        </li>
      </ul>
    </footer>
  );
}
