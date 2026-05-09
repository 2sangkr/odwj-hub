"use client";

import { useOrder } from "../../store/orderStore";
import { spiceLevels } from "../../data/menuData";
import styles from "./Step.module.css";

const SPICE_EMOJI = ["🤍", "🌶️", "🌶️🌶️", "🌶️🌶️🌶️"];

export default function StepSpice() {
  const { state, dispatch } = useOrder();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>얼마나 맵게? 🌶️</h2>
      <p className={styles.sub}>맵기 단계를 골라봐</p>
      <div className={styles.grid}>
        {spiceLevels.map((item) => (
          <button
            key={item.id}
            className={`${styles.chip} ${styles.chipWide} ${state.spiceLevel?.id === item.id ? styles.chipSelected : ""}`}
            onClick={() => dispatch({ type: "SET_SPICE", payload: item })}
          >
            <span className={styles.spiceEmoji}>{SPICE_EMOJI[item.level]}</span>
            {item.name}
          </button>
        ))}
      </div>

      <div className={styles.toggleRow}>
        <div
          className={`${styles.toggleChip} ${state.peanutSauce ? styles.toggleOn : ""}`}
          onClick={() => dispatch({ type: "SET_PEANUT_SAUCE", payload: !state.peanutSauce })}
        >
          🥜 땅콩소스
        </div>
        <div
          className={`${styles.toggleChip} ${state.mayu > 0 ? styles.toggleOn : ""}`}
          onClick={() => dispatch({ type: "SET_MAYU", payload: state.mayu > 0 ? 0 : 1 })}
        >
          ✨ 마유 (얼얼)
        </div>
      </div>
    </div>
  );
}
