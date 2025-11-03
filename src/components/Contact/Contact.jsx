import React, { useRef, useState } from "react";
import styles from "./Contact.module.css";
import emailjs from '@emailjs/browser';

export const Contact = () => {
  const [status, setStatus] = useState("");
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_kcax8oe",
      "template_iaidoqg",
      e.target,
      "spH4gHTLvfPl2zFVK"
    ).then(
      (result) => {
        setStatus("✅ Message sent successfully!");
        e.target.reset();
      },
      (error) => {
        setStatus("❌ Failed to send. Try again later.");
      }
    );
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Contact <span className={styles.accent}>Me</span>
      </h2>

      <div className={styles.container}>
        <div className={styles.formCol}>
          <h3 className={styles.subheading}>Feel Free to Contact !!</h3>
          <form className={styles.form} onSubmit={sendEmail}>
            <input className={styles.input} type="text" name="from_name" placeholder="Name" required />
            <input className={styles.input} type="email" name="from_email" placeholder="Email" required />
            <textarea className={styles.textarea} name="message" placeholder="Message" required />
            <button className={styles.button} type="submit">Send Message</button>
          </form>
          {status && <p className={styles.status}>{status}</p>}
        </div>

        <div className={styles.infoCol}>
          <h3 className={styles.subheading}>Info</h3>
          <ul className={styles.infoList}>
            <li className={styles.infoItem}><span className={styles.icon}>📞</span><a href="tel:+918791936625" className={styles.link}>+91-8791936625</a></li>
            <li className={styles.infoItem}><span className={styles.icon}>✉️</span><a href="mailto:Khushianand2504@gmail.com" className={styles.link}>Khushianand2504@gmail.com</a></li>
            <li className={styles.infoItem}><span className={styles.icon}>📍</span><span>98 A Race Course, Dehradun-248001</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
};
