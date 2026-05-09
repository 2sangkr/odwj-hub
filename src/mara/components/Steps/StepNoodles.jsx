"use client";

import { useOrder } from "../../store/orderStore";
import { noodles } from "../../data/menuData";
import styles from "./Step.module.css";

export default function StepNoodles() {
  const { state, dispatch } = useOrder();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>면을 골라봐 🍜</h2>
      <p className={styles.sub}>딱 하나만!</p>
      <div className={styles.grid}>
        {noodles.map((item) => (
          <button
            key={item.id}
            className={`${styles.chip} ${state.noodle?.id === item.id ? styles.chipSelected : ""}`}
            onClick={() => dispatch({ type: "SET_NOODLE", payload: item })}
          >
            {item.isPopular && <span className={styles.badge}>인기</span>}
            <span className={styles.chipEmoji}>{item.emoji}</span>{item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
