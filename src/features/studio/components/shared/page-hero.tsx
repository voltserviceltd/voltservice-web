import styles from "./studio-page.module.css";

export function PageHero({
  eyebrow,
  title,
  summary,
}: {
  eyebrow: string;
  title: string;
  summary: string;
}) {
  return (
    <section className={styles.pageHero}>
      <div className={styles.sectionInner}>
        <p className={styles.pageEyebrow}>{eyebrow}</p>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSummary}>{summary}</p>
      </div>
    </section>
  );
}

