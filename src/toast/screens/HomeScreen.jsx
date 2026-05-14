"use client";

import { SITUATIONS } from "../data/toastData";
import styles from "./HomeScreen.module.css";

export default function HomeScreen({ onSelect }) {
  return (
    <div className={styles.container}>
      <div className={styles.glassWrap}>
        <span className={styles.glass}>🥂</span>
      </div>

      <div className={styles.textBlock}>
        <p className={styles.sub}>오늘 자리에 딱 맞는</p>
        <h1 className={styles.title}>건배제의 생성기</h1>
        <p className={styles.desc}>상황을 고르면 바로 뽑아드립니다</p>
      </div>

      <div className={styles.grid}>
        {SITUATIONS.map((sit) => (
          <button
            key={sit.id}
            className={styles.sitBtn}
            onClick={() => onSelect(sit)}
          >
            <span className={styles.sitEmoji}>{sit.emoji}</span>
            <span className={styles.sitLabel}>{sit.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
