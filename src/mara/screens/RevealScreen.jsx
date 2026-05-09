"use client";

import { useState, useEffect, useRef } from "react";
import { useOrder } from "../store/orderStore";
import { noodles, toppings as toppingData, proteins, spiceLevels } from "../data/menuData";
import styles from "./RevealScreen.module.css";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildRandomOrder() {
  return {
    noodle:    pick(noodles),
    toppings:  Object.values(toppingData).map((g) => pick(g.items)),
    protein:   pick(proteins),
    spice:     pick(spiceLevels),
    peanut:    Math.random() > 0.5,
    mayu:      Math.random() > 0.6 ? 1 : 0,
  };
}

const SPICE_EMOJI = ["🤍", "🌶️", "🌶️🌶️", "🌶️🌶️🌶️"];

const SPIN_WORDS = [
  ...noodles.map((n) => n.name),
  ...Object.values(toppingData).flatMap((g) => g.items.map((i) => i.name)),
  ...proteins.map((p) => p.name),
  ...spiceLevels.map((s) => s.name),
];

const toppingGroups = Object.values(toppingData);

export default function RevealScreen({ onDone }) {
  const { dispatch } = useOrder();
  const order = useRef(buildRandomOrder()).current;
  const intervalRef = useRef(null);

  // 면 1개 + 토핑 5개(각 군 별도) + 단백질 + 맵기 = 총 8단계
  const steps = [
    {
      category: "noodle",
      emoji: "🍜",
      question: "오늘의 면은?",
      result: `${order.noodle.emoji} ${order.noodle.name}`,
    },
    ...toppingGroups.map((group, i) => ({
      category: "topping",
      emoji: "✨",
      question: `${group.label} 토핑은?`,
      result: `${order.toppings[i].emoji} ${order.toppings[i].name}`,
      toppingIdx: i,
    })),
    {
      category: "protein",
      emoji: "🥩",
      question: "단백질은?",
      result: `${order.protein.emoji} ${order.protein.name}`,
    },
    {
      category: "spice",
      emoji: "🌶️",
      question: "맵기는 얼마나?",
      result: `${order.spice.name}  ${SPICE_EMOJI[order.spice.level]}`,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [phase, setPhase] = useState("spinning"); // spinning | revealed
  const [displayText, setDisplayText] = useState("");
  const [revealedToppings, setRevealedToppings] = useState([]); // 이미 확정된 토핑들

  useEffect(() => {
    setPhase("spinning");
    setDisplayText(pick(SPIN_WORDS));
    intervalRef.current = setInterval(() => {
      setDisplayText(pick(SPIN_WORDS));
    }, 80);
    return () => clearInterval(intervalRef.current);
  }, [currentStep]);

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setDisplayText(steps[currentStep].result);
    setPhase("revealed");
  };

  const handleNext = () => {
    const current = steps[currentStep];
    // 토핑 단계를 떠날 때 누적 로그에 추가
    if (current.category === "topping") {
      setRevealedToppings((prev) => [...prev, order.toppings[current.toppingIdx]]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      dispatch({ type: "SET_NOODLE",       payload: order.noodle });
      dispatch({ type: "SET_TOPPINGS",     payload: order.toppings });
      dispatch({ type: "SET_PROTEIN",      payload: order.protein });
      dispatch({ type: "SET_SPICE",        payload: order.spice });
      dispatch({ type: "SET_PEANUT_SAUCE", payload: order.peanut });
      dispatch({ type: "SET_MAYU",         payload: order.mayu });
      onDone();
    }
  };

  const step = steps[currentStep];
  const isTopping = step.category === "topping";

  return (
    <div className={styles.container}>
      {/* 진행 점 — 8단계 */}
      <div className={styles.dots}>
        {steps.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot}
              ${i < currentStep  ? styles.dotDone   : ""}
              ${i === currentStep ? styles.dotActive : ""}`}
          />
        ))}
      </div>

      {/* 메인 카드 */}
      <div className={styles.card}>
        <span className={`${styles.emoji} ${phase === "spinning" ? styles.emojiSpin : ""}`}>
          {step.emoji}
        </span>
        <p className={styles.question}>{step.question}</p>

        <div className={`${styles.resultBox} ${phase === "revealed" ? styles.revealed : styles.spinning}`}>
          {displayText || "·  ·  ·"}
        </div>

        {phase === "revealed" && (
          <div className={styles.sparkles}>✦  ✦  ✦</div>
        )}
      </div>

      {/* 이미 확정된 토핑 누적 표시 (토핑 단계 중에만) */}
      {isTopping && revealedToppings.length > 0 && (
        <div className={styles.toppingLog}>
          <p className={styles.toppingLogTitle}>✨ 지금까지 나온 토핑</p>
          <div className={styles.toppingLogChips}>
            {revealedToppings.map((t) => (
              <span key={t.id} className={styles.toppingChip}>{t.emoji} {t.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* 버튼 */}
      <div className={styles.actions}>
        {phase === "spinning" ? (
          <button className={styles.btnStop} onClick={handleStop}>
            🛑 멈춰!
          </button>
        ) : (
          <button className={styles.btnNext} onClick={handleNext}>
            {currentStep < steps.length - 1 ? "다음 →" : "✦ 결과 보기"}
          </button>
        )}
      </div>
    </div>
  );
}
