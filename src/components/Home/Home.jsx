import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./Home.module.css";
import myPhoto from "../../assets/portfolio.png"; // adjust path

export const Home = () => {
  const roles = ["Software Developer", "Machine Learning Engineer", "Programmer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 60 : 100;

    if (!isDeleting && displayed === current) {
      const pause = setTimeout(() => setIsDeleting(true), 1000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
      return;
    }

    const tick = setTimeout(() => {
      const nextText = isDeleting
        ? current.substring(0, displayed.length - 1)
        : current.substring(0, displayed.length + 1);
      setDisplayed(nextText);
    }, typingSpeed);

    return () => clearTimeout(tick);
  }, [displayed, isDeleting, roleIndex]);

  return (
    <section id="home" className={styles.container}>
      {/* Content on the right */}
      <div className={styles.content}>
        <h1 className={styles.title}>Hello, It's Me Khushi Anand</h1>
        <p className={styles.description}>
          I'm a <span className={styles.rotatingWords}>{displayed}</span>
          <span className={styles.caret}>|</span>
        </p>
        <p className={styles.description}>
          Currently pursuing my Bachelor's in Computer Science from Graphic Era Deemed to be University
        </p>

        <div className={styles.actions}>
          <a
            href="https://www.linkedin.com/in/khushi-anand-96251724b"
            target="_blank"
            rel="noreferrer"
            className={styles.iconButton}
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href="https://github.com/khushiAnand25"
            target="_blank"
            rel="noreferrer"
            className={styles.iconButton}
          >
            <FaGithub size={22} />
          </a>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className={styles.contactBtn} // use same button style as contactBtn
          >
            Resume
          </a>
        </div>
      </div>

      {/* Floating profile image on the left */}
      <div className={styles.imageWrapper}>
        <img src={myPhoto} alt="My Photo" className={styles.HomeImg} />
      </div>
    </section>
  );
};
