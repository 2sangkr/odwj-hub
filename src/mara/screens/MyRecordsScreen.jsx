"use client";

import { useState } from "react";
import { getRecords, deleteRecord } from "../utils/records";
import styles from "./MyRecordsScreen.module.css";

const SPICE_EMOJI = ["🤍", "🌶️", "🌶️🌶️", "🌶️🌶️🌶️"];

export default function MyRecordsScreen({ onBack }) {
  const [records, setRecords] = useState(getRecords);
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = (id) => {
    deleteRecord(id);
    setRecords(getRecords());
    setConfirmId(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.back} onClick={onBack}>←</button>
        <h2 className={styles.title}>나의 기록</h2>
        <span className={styles.count}>{records.length}개</span>
      </div>

      <div className={styles.list}>
        {records.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyEmoji}>🍜</p>
            <p className={styles.emptyText}>아직 저장된 조합이 없어!</p>
            <p className={styles.emptySub}>맛있는 조합을 뽑고 기록해봐 ✿</p>
          </div>
        )}

        {records.map((r) => (
          <div key={r.id} className={styles.card}>
            <div className={styles.cardTop}>
              <div>
                <p className={styles.comboName}>{r.comboName}</p>
                <p className={styles.date}>{r.savedAt}</p>
              </div>
              {confirmId === r.id ? (
                <div className={styles.confirmRow}>
                  <button className={styles.btnConfirm} onClick={() => handleDelete(r.id)}>삭제</button>
                  <button className={styles.btnCancel} onClick={() => setConfirmId(null)}>취소</button>
                </div>
              ) : (
                <button className={styles.btnDelete} onClick={() => setConfirmId(r.id)}>✕</button>
              )}
            </div>

            <div className={styles.divider} />

            <div className={styles.tags}>
              <Tag>🍜 {r.noodle?.name}</Tag>
              <Tag>🥩 {r.protein?.name}</Tag>
              <Tag>🌶️ {r.spiceLevel?.name} {SPICE_EMOJI[r.spiceLevel?.level ?? 0]}</Tag>
              {r.toppings?.slice(0, 3).map((t) => (
                <Tag key={t.id}>✨ {t.name}</Tag>
              ))}
              {r.toppings?.length > 3 && (
                <Tag>+{r.toppings.length - 3}개</Tag>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return <span className={styles.tag}>{children}</span>;
}
