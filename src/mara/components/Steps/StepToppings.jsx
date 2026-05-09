"use client";

import { useOrder } from "../../store/orderStore";
import { toppings } from "../../data/menuData";
import styles from "./Step.module.css";

export default function StepToppings() {
  const { state, dispatch } = useOrder();

  const toggle = (item) => {
    const exists = state.toppings.find((t) => t.id === item.id);
    const updated = exists
      ? state.toppings.filter((t) => t.id !== item.id)
      : [...state.toppings, item];
    dispatch({ type: "SET_TOPPINGS", payload: updated });
  };

  const isSelected = (id) => state.toppings.some((t) => t.id === id);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>토핑 골라봐 ✨</h2>
      <p className={styles.sub}>맘껏 담아! ({state.toppings.length}개 선택됨)</p>

      {Object.entries(toppings).map(([key, group]) => (
        <div key={key} className={styles.group}>
          <p className={styles.groupLabel}>{group.label}</p>
          <div className={styles.chipRow}>
            {group.items.map((item) => (
              <button
                key={item.id}
                className={`${styles.chip} ${isSelected(item.id) ? styles.chipSelected : ""}`}
                onClick={() => toggle(item)}
              >
                {item.isPopular && <span className={styles.badge}>인기</span>}
                <span className={styles.chipEmoji}>{item.emoji}</span>{item.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
