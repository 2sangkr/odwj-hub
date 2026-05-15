'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const HORROR_ITEMS = [
  { emoji: '🫙', text: '언제 넣었는지 모를 반찬', sub: '뚜껑 열면 뭔가 올라와 있을 것 같은' },
  { emoji: '🧈', text: '까맣게 잊혀진 두부', sub: '물이 뿌옇게 변해있을지도' },
  { emoji: '🥬', text: '흐물흐물해진 야채', sub: '원래 이렇게 작았나?' },
  { emoji: '🍖', text: '냉동실 속 미지의 고기', sub: '언제 넣었는지 기억이 없다' },
  { emoji: '🥛', text: '유통기한 지난 우유', sub: '흔들면 뭔가 다른 소리가 난다' },
  { emoji: '🍱', text: '배달 남긴 것', sub: '그게 언제였더라...' },
  { emoji: '🫘', text: '검은봉지 속 미지의 물체', sub: '열어보기 두렵다' },
  { emoji: '🧫', text: '곰팡이 핀 뭔가', sub: '색깔이 원래 저랬나?' },
  { emoji: '🥡', text: '오래된 소스류', sub: '뚜껑에 뭔가 말라붙어 있을 것 같은' },
  { emoji: '🐟', text: '냄새가 날 것 같은 생선', sub: '냉장고 문 열면 먼저 느껴지는 그것' },
  { emoji: '🍚', text: '굳어버린 밥', sub: '언제 지었는지 모른다' },
  { emoji: '🥚', text: '깨진 것 같은 달걀', sub: '구석에 굴러다니는 것' },
];

function getDaysSince(dateStr) {
  if (!dateStr) return null;
  return Math.floor((new Date() - new Date(dateStr)) / 86400000);
}

function getLevel(days) {
  if (days === null) return 4;
  if (days < 3)  return 0;
  if (days < 7)  return 1;
  if (days < 14) return 2;
  if (days < 21) return 3;
  return 4;
}

const LEVELS = [
  { title: '냉장고 상태 양호',     emoji: '🧊', desc: '최근에 확인했군요. 잘 하고 있어요.', bg: 'safe' },
  { title: '슬슬 확인할 때예요',   emoji: '🫙', desc: '며칠 지났어요. 한번쯤 열어볼 때가 됐어요.', bg: 'mild' },
  { title: '냉장고가 위험합니다',  emoji: '⚠️', desc: '일주일이 넘었어요. 지금 뭔가 자라고 있을지도.', bg: 'warn' },
  { title: '심각한 상황입니다',    emoji: '🤢', desc: '2주 넘게 방치됐어요. 용기가 필요합니다.', bg: 'danger' },
  { title: '지금 당장 열어보세요!', emoji: '☠️', desc: '냉장고 안이 어떻게 됐는지 아무도 모릅니다.', bg: 'horror' },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function FridgePage() {
  const [lastCheck, setLastCheck] = useState(undefined);
  const [horrorItems, setHorrorItems] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('fridge_lastcheck');
    setLastCheck(saved || null);
    setHorrorItems(shuffle(HORROR_ITEMS).slice(0, 4));
  }, []);

  function handleCheck() {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('fridge_lastcheck', today);
    setLastCheck(today);
    setChecked(true);
  }

  if (lastCheck === undefined) return null;

  const days  = getDaysSince(lastCheck);
  const level = getLevel(days);
  const info  = LEVELS[level];

  if (checked) {
    return (
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href="/" className={styles.back}>←</Link>
          <span className={styles.headerTitle}>🖤 검은봉지 체크</span>
          <div />
        </header>
        <div className={styles.doneWrap}>
          <div className={styles.doneEmoji}>✅</div>
          <p className={styles.doneTitle}>점검 완료!</p>
          <p className={styles.doneSub}>냉장고가 오늘도 무사하길 바랍니다.<br />7일 뒤에 다시 확인해보세요.</p>
          <Link href="/" className={styles.btnHome}>← 홈으로</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${styles[info.bg]}`}>
      <header className={styles.header}>
        <Link href="/" className={styles.back}>←</Link>
        <span className={styles.headerTitle}>🖤 검은봉지 체크</span>
        <div />
      </header>

      {/* 메인 경고 */}
      <div className={styles.warnSection}>
        <div className={styles.bigEmoji}>{info.emoji}</div>
        <h1 className={styles.warnTitle}>{info.title}</h1>
        <p className={styles.warnDesc}>{info.desc}</p>
        {days !== null && (
          <p className={styles.daysBadge}>마지막 점검 {days === 0 ? '오늘' : `${days}일 전`}</p>
        )}
        {days === null && (
          <p className={styles.daysBadge}>점검 기록 없음</p>
        )}
      </div>

      {/* 냉장고 안에 있을지도 모르는 것들 */}
      <div className={styles.horrorSection}>
        <p className={styles.horrorLabel}>지금 냉장고 안에 있을지도 모르는 것들</p>
        <div className={styles.horrorGrid}>
          {horrorItems.map((item, i) => (
            <div key={i} className={styles.horrorCard}>
              <span className={styles.horrorEmoji}>{item.emoji}</span>
              <p className={styles.horrorText}>{item.text}</p>
              <p className={styles.horrorSub}>{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={styles.ctaSection}>
        <button className={styles.btnGo} onClick={handleCheck}>
          지금 냉장고 확인하러 간다 🚨
        </button>
        <p className={styles.ctaHint}>누르면 오늘 점검 완료로 기록돼요</p>
      </div>
    </div>
  );
}
