"use client";

import { useState } from "react";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import styles from "./HomeScreen.module.css";

const FLOW = [
  { emoji: "🍜", label: "면" },
  { emoji: "✨", label: "토핑" },
  { emoji: "🥩", label: "고기" },
  { emoji: "🌶️", label: "맵기" },
];

export default function HomeScreen({ onStart, onRecords }) {
  const { canInstall, isIOS, installed, install } = useInstallPrompt();
  const [showGuide, setShowGuide] = useState(false);

  const handleInstall = () => {
    if (canInstall) {
      install(); // 크롬/안드로이드: 자동 설치 팝업
    } else {
      setShowGuide(true); // iOS/기타: 수동 안내
    }
  };

  return (
    <div className={styles.container}>

      {/* 최상단 바: 앱명 + 홈화면 추가 버튼 */}
      <div className={styles.topBar}>
        <span className={styles.appBadge}>오늘은 마라?!</span>
        {!installed && (
          <button className={styles.btnInstall} onClick={handleInstall}>
            📲 홈화면에<br />추가하기
          </button>
        )}
      </div>

      {/* 타이틀 좌 / 플로우 우 */}
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <p className={styles.sub}>오늘 뭐 먹지? 고민 끝!</p>
          <h1 className={styles.title}>오늘은<br />마라?!</h1>
        </div>

        <div className={styles.flow}>
          {FLOW.map((step, i) => (
            <div key={i} className={styles.flowRow}>
              <div className={styles.flowStep}>
                <span className={styles.flowEmoji}>{step.emoji}</span>
                <span className={styles.flowLabel}>{step.label}</span>
              </div>
              {i < FLOW.length - 1 && <span className={styles.arrow}>↓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className={styles.bottom}>
        <button className={styles.btnRandom} onClick={() => onStart("random")}>
          ✦ 랜덤 뽑기
        </button>
        <button className={styles.btnManual} onClick={() => onStart("manual")}>
          직접 고르기
        </button>
        <button className={styles.btnRecords} onClick={onRecords}>
          📋 나의 기록 보기
        </button>
        <p className={styles.hint}>친구들과 같이 뽑아봐 ✿</p>
      </div>

      {/* 수동 설치 안내 모달 (iOS / prompt 미발생) */}
      {showGuide && (
        <div className={styles.overlay} onClick={() => setShowGuide(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <p className={styles.modalTitle}>홈화면에 추가하는 방법</p>
            <ol className={styles.modalSteps}>
              {isIOS ? (
                <>
                  <li>아래 공유 버튼 <strong>□↑</strong> 탭</li>
                  <li><strong>"홈 화면에 추가"</strong> 선택</li>
                  <li><strong>"추가"</strong> 탭</li>
                </>
              ) : (
                <>
                  <li>브라우저 메뉴 <strong>⋮</strong> 탭</li>
                  <li><strong>"홈 화면에 추가"</strong> 선택</li>
                  <li><strong>"추가"</strong> 탭</li>
                </>
              )}
            </ol>
            <button className={styles.modalClose} onClick={() => setShowGuide(false)}>
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
