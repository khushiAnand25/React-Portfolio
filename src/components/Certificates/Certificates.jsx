import React from "react";
import styles from "./Certificates.module.css";

const PLACEHOLDER = "https://via.placeholder.com/800x560?text=Certificate";

const CERTS = [
  {
    id: 1,
    title: "Salesforce Developer With Agentblazer Champion Program",
    img: "/Salesforce.png",
    description:
      "The Salesforce Agentblazer Champion program provides in-depth training on AI concepts, " +
      "building and deploying intelligent agents using Salesforce Agentforce, integrating " +
      "them with Data Cloud, designing effective prompts, and understanding AI " +
      "governance and ethical practices for business automation."
  },
  {
    id: 2,
    title: "DP 900 Certificate Microsoft Azure Data Fundamentals",
    img: "/DP900 Microsoft Azure.png",
    description:
      "An entry-level certification that validates foundational knowledge of core data concepts, " +
      "relational and non-relational data, " +
      "and Azure data services. Focuses on storing, processing, " +
      "and analyzing data using Microsoft Azure, including Azure SQL, Cosmos DB, Synapse Analytics, and Power BI. " +
      "Ideal for beginners in data and cloud technologies.",
  },
  {
    id: 3,
    title: "Deloitte Data Analytics Job Simulation",
    img: "/Deloitte.png",
    description:
      "Build an interactive dashboard using Tableau, " +
      "Analyze and classify data using Excel to uncover key business insights.",
  },
  {
    id: 4,
    title: "CodeClash: The August Arena",
    img: "/Round1.png",
    description:
      "This event held on 30th August via Unstop, where 4,930 participants competed. " +
      "Secured 41st rank by answering core subject questions (Operating Systems, DBMS, Computer Networks, and Programming) " +
      "within 1 minute per question",
  },
  {
    id: 5,
    title: "CodeClash: The August Arena",
    img: "/Round2.png",
    description:
      "This event was held on 31st August for the shortlisted participants, where around 400 people were selected. " +
      "This round was a technical round with 6 coding questions, and I secured 75th rank."
  },
];

export const Certificates = () => {
  return (
    <section id="certificates" className={styles.section}>
      <div className={styles.container}>
        {CERTS.map((c) => (
          <div key={c.id} className={styles.card}>
            <img
              className={styles.image}
              src={c.img}
              alt={c.title}
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
            />
            <div className={styles.overlay}>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.desc}>{c.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
