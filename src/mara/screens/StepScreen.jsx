"use client";

import { useState } from "react";
import { useOrder } from "../store/orderStore";
import StepNoodles from "../components/Steps/StepNoodles";
import StepToppings from "../components/Steps/StepToppings";
import StepProtein from "../components/Steps/StepProtein";
import StepSpice from "../components/Steps/StepSpice";
import styles from "./StepScreen.module.css";

const STEPS = ["면", "토핑", "단백질", "맵기"];

export default function StepScreen({ onDone }) {
  const [step, setStep] = useState(0);
  const { state } = useOrder();

  const canNext = () => {
    if (step === 0) return !!state.noodle;
    if (step === 1) return state.toppings.length > 0;
    if (step === 2) return !!state.protein;
    if (step === 3) return state.spiceLevel !== null;
    return true;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onDone();
  };

  return (
    <div className={styles.container}>
      {/* 상단 진행 바 */}
      <div className={styles.header}>
        {step > 0 && (
          <button className={styles.back} onClick={() => setStep(step - 1)}>←</button>
        )}
        <div className={styles.dots}>
          {STEPS.map((_, i) => (
            <span key={i} className={`${styles.dot} ${i <= step ? styles.dotActive : ""}`} />
          ))}
        </div>
        <span className={styles.stepLabel}>{step + 1} / {STEPS.length}</span>
      </div>

      {/* Step 화면 */}
      <div className={styles.content}>
        {step === 0 && <StepNoodles />}
        {step === 1 && <StepToppings />}
        {step === 2 && <StepProtein />}
        {step === 3 && <StepSpice />}
      </div>

      {/* 다음 버튼 */}
      <div className={styles.footer}>
        <button
          className={styles.btnNext}
          onClick={handleNext}
          disabled={!canNext()}
        >
          {step < 3 ? "다음" : "✦ 결과 보기"}
        </button>
      </div>
    </div>
  );
}
