import Link from "next/link";
import styles from "./page.module.css";

const APPS = [
  {
    id: "mara",
    emoji: "🍜",
    title: "오늘은 마라?!",
    desc: "마라탕 조합 뽑기",
    href: "/mara",
    ready: true,
  },
  {
    id: "lunch",
    emoji: "🍽️",
    title: "점심 뭐 먹지?",
    desc: "직장인 점심 룰렛",
    href: "/lunch",
    ready: false,
  },
  {
    id: "movie",
    emoji: "🎬",
    title: "뭐 볼까?",
    desc: "OTT 장르 뽑기",
    href: "/movie",
    ready: false,
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p className={styles.subTitle}>오늘도 결정 장애?</p>
        <h1 className={styles.title}>오늘 뭐 하지? 🤔</h1>
      </header>

      <section className={styles.grid}>
        {APPS.map((app) =>
          app.ready ? (
            <Link key={app.id} href={app.href} className={styles.card}>
              <span className={styles.cardEmoji}>{app.emoji}</span>
              <strong className={styles.cardTitle}>{app.title}</strong>
              <span className={styles.cardDesc}>{app.desc}</span>
            </Link>
          ) : (
            <div key={app.id} className={`${styles.card} ${styles.cardSoon}`}>
              <span className={styles.cardEmoji}>{app.emoji}</span>
              <strong className={styles.cardTitle}>{app.title}</strong>
              <span className={styles.cardDesc}>{app.desc}</span>
              <span className={styles.soonBadge}>곧 오픈</span>
            </div>
          )
        )}
      </section>

      <section className={styles.recommend}>
        <p className={styles.recommendLabel}>✦ 오늘의 추천</p>
        <Link href="/mara" className={styles.recommendCard}>
          <span className={styles.recommendEmoji}>🍜</span>
          <div className={styles.recommendText}>
            <p className={styles.recommendTitle}>오늘은 마라?!</p>
            <p className={styles.recommendDesc}>마라탕 조합을 랜덤으로 뽑아봐</p>
          </div>
          <span className={styles.recommendArrow}>→</span>
        </Link>
      </section>
    </main>
  );
}
