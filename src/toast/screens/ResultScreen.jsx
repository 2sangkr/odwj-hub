"use client";

import { useState, useCallback } from "react";
import Toast from "../components/Toast/Toast";
import styles from "./ResultScreen.module.css";

export default function ResultScreen({ situation, phrase, onReroll, onBack }) {
  const [toast, setToast] = useState(null);
  const showToast = useCallback((msg) => setToast(msg), []);

  const shareText = [
    `🥂 건배제의 (${situation.emoji} ${situation.label})`,
    "",
    phrase,
    "",
    "건배제의 뽑기 → 오늘 뭐 하지?",
  ].join("\n");

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "건배제의 🥂", text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        showToast("클립보드에 복사됐어! ✦");
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        await navigator.clipboard.writeText(shareText);
        showToast("클립보드에 복사됐어! ✦");
      }
    }
  };

  return (
    <div className={styles.container}>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <span className={styles.appName}>건배제의 생성기</span>
          <span className={styles.badge}>{situation.emoji} {situation.label}</span>
        </div>

        <div className={styles.glassArea}>
          <span className={styles.glass}>🥂</span>
        </div>

        <p className={styles.wiyahyeo}>위하여!</p>

        <p className={styles.phrase}>{phrase}</p>

        <div className={styles.cardFooter}>건배제의 뽑기 → 오늘 뭐 하지?</div>
      </div>

      <div className={styles.actions}>
        <button className={styles.btnShare} onClick={handleShare}>
          💌 공유하기
        </button>
        <button className={styles.btnReroll} onClick={onReroll}>
          🔄 다시 뽑기
        </button>
        <button className={styles.btnBack} onClick={onBack}>
          상황 바꾸기
        </button>
      </div>
    </div>
  );
}
