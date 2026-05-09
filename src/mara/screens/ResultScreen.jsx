"use client";

import { useRef, useState, useCallback } from "react";
import { useOrder } from "../store/orderStore";
import { generateComboName } from "../utils/comboName";
import { saveRecord } from "../utils/records";
import Toast from "../components/Toast/Toast";
import styles from "./ResultScreen.module.css";

const SPICE_EMOJI = ["🤍", "🌶️", "🌶️🌶️", "🌶️🌶️🌶️"];

// 재료 위치 — 국물 전체에 깊이감 있게 배치 (viewBox 340×230 기준 %)
const POS = [
  { top: "50%", left: "25%", rot: "-8deg"  },  // 표면, 왼쪽
  { top: "48%", left: "47%", rot:  "5deg"  },  // 표면, 중앙
  { top: "50%", left: "67%", rot: "-11deg" },  // 표면, 오른쪽
  { top: "61%", left: "34%", rot: "12deg"  },  // 중간 깊이, 왼쪽
  { top: "59%", left: "57%", rot:  "-5deg" },  // 중간 깊이, 오른쪽
  { top: "70%", left: "45%", rot:  "8deg"  },  // 깊은 곳, 중앙
  { top: "66%", left: "27%", rot:  "-3deg" },  // 깊은 곳, 왼쪽
];

function BowlDiagram({ noodle, toppings, protein, spiceLevel }) {
  const spiceEmoji = SPICE_EMOJI[spiceLevel?.level ?? 0];
  const proteinShort = protein?.name?.replace(/ \(.*\)/, "") ?? "-";
  const isSpicy = (spiceLevel?.level ?? 0) >= 2;

  // 그릇 안에 뿌려질 재료 (최대 7개)
  const bowlItems = [
    noodle,
    ...toppings,
    protein?.id !== "p4" ? protein : null,
  ].filter(Boolean).slice(0, 7);

  return (
    <div className={styles.diagram}>
      {/* 그릇 일러스트 */}
      <div className={styles.bowlWrap}>
        <svg
          className={styles.bowlSvg}
          viewBox="0 0 340 230"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 수증기 */}
          <path className={styles.steam1} d="M128,44 Q122,30 129,18 Q136,30 130,44"
            stroke="#d8b4fe" strokeWidth="2.5" strokeLinecap="round"/>
          <path className={styles.steam2} d="M170,40 Q164,26 171,14 Q178,26 172,40"
            stroke="#d8b4fe" strokeWidth="2.5" strokeLinecap="round"/>
          <path className={styles.steam3} d="M212,44 Q206,30 213,18 Q220,30 214,44"
            stroke="#d8b4fe" strokeWidth="2.5" strokeLinecap="round"/>

          {/* 그릇 그림자 */}
          <ellipse cx="170" cy="222" rx="112" ry="11" fill="rgba(0,0,0,0.06)"/>

          {/* 그릇 몸체 — 국물색으로 가득 */}
          <path d="M50,115 Q52,212 170,212 Q288,212 290,115 Z" fill="#fef3c7"/>
          {/* 국물 깊이감: 중앙·바닥 진하게 */}
          <ellipse cx="170" cy="178" rx="102" ry="42" fill="#fbbf24" opacity="0.22"/>
          <ellipse cx="170" cy="196" rx="78"  ry="26" fill="#f97316" opacity="0.18"/>
          {/* 그릇 왼쪽 광택 */}
          <path d="M60,115 Q62,200 105,208"
            stroke="rgba(255,255,255,0.55)" strokeWidth="5" strokeLinecap="round"/>

          {/* 황금 테두리 */}
          <ellipse cx="170" cy="115" rx="120" ry="27" fill="#fde68a" stroke="#f59e0b" strokeWidth="2"/>
          {/* 테두리 하이라이트 */}
          <ellipse cx="152" cy="109" rx="52" ry="9" fill="rgba(255,255,255,0.3)"/>

          {/* 국물 표면 shimmer */}
          <ellipse cx="170" cy="124" rx="108" ry="22" fill="#fed7aa" opacity="0.75"/>
          <ellipse cx="170" cy="131" rx="99"  ry="16" fill="#fb923c" opacity="0.42"/>
          <ellipse cx="148" cy="124" rx="30"  ry="8"  fill="rgba(255,255,255,0.22)"/>

          {/* 고추기름 방울 (매울 때) */}
          {isSpicy && (
            <>
              <circle cx="200" cy="133" r="4"   fill="#ef4444" opacity="0.65"/>
              <circle cx="228" cy="127" r="3"   fill="#ef4444" opacity="0.5"/>
              <circle cx="147" cy="136" r="3.5" fill="#ef4444" opacity="0.55"/>
              <circle cx="118" cy="130" r="2.5" fill="#ef4444" opacity="0.4"/>
            </>
          )}
        </svg>

        {/* 재료 이모지 (그릇 위 오버레이) */}
        {bowlItems.map((item, i) => (
          <span
            key={item.id}
            className={styles.ingrWrap}
            style={{
              top: POS[i].top,
              left: POS[i].left,
              animationDelay: `${i * 0.35}s`,
            }}
          >
            <span className={styles.ingr} style={{ transform: `rotate(${POS[i].rot})` }}>
              {item.emoji}
            </span>
          </span>
        ))}
      </div>

      {/* 재료 정보 라벨 */}
      <div className={styles.labelGrid}>
        <div className={styles.labelCell}>
          <span className={styles.lblCat}>🍜 면</span>
          <span className={styles.lblVal}>{noodle?.emoji} {noodle?.name ?? "-"}</span>
        </div>
        <div className={styles.labelCell}>
          <span className={styles.lblCat}>🥩 단백질</span>
          <span className={styles.lblVal}>{protein?.emoji} {proteinShort}</span>
        </div>
        <div className={`${styles.labelCell} ${styles.labelCellFull}`}>
          <span className={styles.lblCat}>✨ 토핑 ({toppings.length}가지)</span>
          <div className={styles.toppingList}>
            {toppings.map((t) => (
              <span key={t.id} className={styles.toppingTag}>{t.emoji} {t.name}</span>
            ))}
          </div>
        </div>
        <div className={`${styles.labelCell} ${styles.labelCellFull}`}>
          <span className={styles.lblCat}>🌶️ 맵기</span>
          <span className={styles.lblVal}>{spiceLevel?.name} {spiceEmoji}</span>
        </div>
      </div>
    </div>
  );
}

async function generateImage(cardEl) {
  const { default: html2canvas } = await import("html2canvas");
  return html2canvas(cardEl, { scale: 2, useCORS: true });
}

export default function ResultScreen({ onRestart, onRecords }) {
  const { state, dispatch } = useOrder();
  const cardRef = useRef(null);
  const comboName = useRef(generateComboName(state)).current;
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => setToast(msg), []);

  const shareText = [
    `✦ ${comboName}`,
    `🍜 면: ${state.noodle?.name}`,
    `✨ 토핑: ${state.toppings.map((t) => t.name).join(", ")}`,
    `🥩 고기: ${state.protein?.name}`,
    `🌶️ 맵기: ${state.spiceLevel?.name} ${SPICE_EMOJI[state.spiceLevel?.level ?? 0]}`,
    "",
    "나도 뽑기 👉 오늘은 마라?!",
  ].join("\n");

  const handleImageSave = async () => {
    const canvas = await generateImage(cardRef.current);
    const link = document.createElement("a");
    link.download = "오늘의마라조합.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleShare = async () => {
    try {
      const canvas = await generateImage(cardRef.current);
      canvas.toBlob(async (blob) => {
        const file = new File([blob], "오늘의마라조합.png", { type: "image/png" });
        const canShareFile = navigator.canShare?.({ files: [file] });
        if (navigator.share) {
          await navigator.share({
            title: "오늘은 마라?! 🍜",
            text: shareText,
            ...(canShareFile ? { files: [file] } : {}),
          });
        } else {
          await navigator.clipboard.writeText(shareText);
          showToast("클립보드에 복사됐어! 붙여넣기 해봐 ✦");
        }
      }, "image/png");
    } catch (e) {
      if (e.name !== "AbortError") {
        await navigator.clipboard.writeText(shareText);
        showToast("클립보드에 복사됐어! 붙여넣기 해봐 ✦");
      }
    }
  };

  const handleSaveRecord = () => {
    saveRecord(state, comboName);
    setSaved(true);
  };

  const handleRestart = () => {
    dispatch({ type: "RESET" });
    onRestart();
  };

  return (
    <div className={styles.container}>
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
      <div className={styles.scrollArea}>
        {/* 공유 카드 */}
        <div className={styles.card} ref={cardRef}>
          <div className={styles.cardHeader}>
            <span className={styles.appName}>오늘은 마라?!</span>
            <span className={styles.rare}>✦ 오늘의 조합</span>
          </div>
          <h2 className={styles.comboName}>{comboName}</h2>
          <div className={styles.divider} />

          <BowlDiagram
            noodle={state.noodle}
            toppings={state.toppings}
            protein={state.protein}
            spiceLevel={state.spiceLevel}
          />

          {(state.peanutSauce || state.mayu > 0) && (
            <div className={styles.extras}>
              <span className={styles.extraLabel}>➕ 추가</span>
              <span className={styles.extraVal}>
                {[state.peanutSauce && "🥜 땅콩소스", state.mayu > 0 && "✨ 마유"].filter(Boolean).join(" + ")}
              </span>
            </div>
          )}

          <div className={styles.cardFooter}>나도 뽑기 → 오늘은 마라?!</div>
        </div>

        {/* 이미지 저장 / 친구 공유 */}
        <div className={styles.actionRow}>
          <button className={styles.btnSave} onClick={handleImageSave}>
            📸 이미지 저장
          </button>
          <button className={styles.btnShare} onClick={handleShare}>
            💌 친구 공유
          </button>
        </div>

        {/* 나의 기록 저장 */}
        <button
          className={`${styles.btnRecord} ${saved ? styles.btnRecordSaved : ""}`}
          onClick={handleSaveRecord}
          disabled={saved}
        >
          {saved ? "✓ 기록 저장 완료!" : "🗂 이 조합 기록하기"}
        </button>

        {/* 하단 */}
        <div className={styles.bottomRow}>
          <button className={styles.btnRestart} onClick={handleRestart}>
            🔄 다시 뽑기
          </button>
          <button className={styles.btnGoRecords} onClick={onRecords}>
            📋 나의 기록
          </button>
        </div>
      </div>
    </div>
  );
}
