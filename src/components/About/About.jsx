import React, { useState } from "react";
import styles from "./About.module.css";
import myPhoto from "../../assets/portfolio.png"; 

export const About = () => {
  const [readMore, setReadMore] = useState(false);

  const firstParagraph = `I have a strong passion for coding and learning new technologies, and I actively seek to apply my knowledge to solve real-world problems. Throughout my academic journey, I have engaged in various projects that have honed my technical skills and deepened my understanding of software development and machine learning. My projects include Sentiment Analysis of Hate Speech Reviews using machine learning algorithms, Air Canvas free to write in air using OpenCv and Hand Gesture, and a Healthcare Chatbot to predict diseases, symptoms and treatments.`;

  const secondParagraph = `In addition to my technical expertise, I have developed good oratory skills, which have helped me communicate effectively in team settings and presentations.`;

  const shortText = firstParagraph.substring(0, 200) + "..."; // show first 200 chars

  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContainer}>
        <div className={styles.imageWrapper}>
          <img src={myPhoto} alt="My Photo" className={styles.aboutImg} />
        </div>
        <div className={styles.aboutContent}>
          <h2 className={styles.sectionHeading}>About Me</h2>
          <h1 className={styles.aboutTitle}>A Passionate Developer Who Loves to Code!!</h1>
          <p className={styles.aboutDescription}>{readMore ? firstParagraph : shortText}</p>
          {readMore && (
            <p className={styles.aboutDescription}>{secondParagraph}</p>
          )}
          <div className={styles.aboutActions}>
            <button className={styles.readMoreBtn} onClick={() => setReadMore(!readMore)}>
              {readMore ? "Read Less" : "Read More"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
