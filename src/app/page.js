import Link from "next/link";
import styles from "./page.module.css";
import InstallBanner from "./InstallBanner";

const CATEGORIES = [
  {
    id: "mealtime",
    label: "🍽️ 밥 먹을 때",
    apps: [
      { id: "mara",     emoji: "🍜", title: "오늘은 마라?!",      href: "/mara",   color: "#ede9fe", ready: true,  large: true },
      { id: "lunch",    emoji: "🍽️",  title: "점심 뭐 먹지?",     href: "/lunch",  color: "#fce7f3", ready: true  },
      { id: "bubble",   emoji: "🧋", title: "버블티 뽑기",        href: "/bubble", color: "#e0f2fe", ready: true  },
      { id: "worldcup", emoji: "🏆", title: "점심 이상형 월드컵",  href: "#",       color: "#fef9c3", ready: false },
      { id: "cvs",      emoji: "🛒", title: "편의점 저녁",         href: "#",       color: "#f0f9ff", ready: false },
      { id: "dinner",   emoji: "🍳", title: "냉파 메뉴 추천",      href: "#",       color: "#fff7ed", ready: false },
      { id: "snack",    emoji: "🍿", title: "야식 뽑기",           href: "#",       color: "#fef9c3", ready: false },
      { id: "cafe",     emoji: "☕", title: "카페 메뉴 뽑기",       href: "#",       color: "#fef3c7", ready: false },
    ],
  },
  {
    id: "drinking",
    label: "🍺 술자리 / 회식",
    apps: [
      { id: "toast",    emoji: "🥂", title: "건배제의 생성기",     href: "/toast", color: "#fef9c3", ready: true, large: true, isNew: true },
      { id: "samhaeng", emoji: "✍️",  title: "삼행시 뽑기",        href: "#", color: "#fdf4ff", ready: false },
      { id: "penalty",  emoji: "😈", title: "벌칙 생성기",         href: "#", color: "#fff1f2", ready: false },
      { id: "game",     emoji: "🎯", title: "술게임 뽑기",         href: "#", color: "#eff6ff", ready: false },
      { id: "venue",    emoji: "📍", title: "회식 장소 추천",       href: "#", color: "#f0fdf4", ready: false },
      { id: "ment",     emoji: "🎤", title: "분위기 메이커 멘트",   href: "#", color: "#fdf2f8", ready: false },
      { id: "dr1",      empty: true },
      { id: "dr2",      empty: true },
    ],
  },
  {
    id: "workout",
    label: "🏋️ 운동할 때",
    apps: [
      { id: "exercise", emoji: "💪", title: "오늘의 운동 뽑기",    href: "#", color: "#f0fdf4", ready: false, large: true },
      { id: "routine",  emoji: "📋", title: "운동 루틴 생성",      href: "#", color: "#eff6ff", ready: false },
      { id: "stretching", emoji: "🧘", title: "스트레칭 뽑기",     href: "#", color: "#fdf4ff", ready: false },
      { id: "calories", emoji: "🔥", title: "칼로리 계산",         href: "#", color: "#fff1f2", ready: false },
      { id: "resttime", emoji: "⏱️",  title: "세트 쉬는 타이머",   href: "#", color: "#fef9c3", ready: false },
      { id: "cheat",    emoji: "🍕", title: "치팅 허용 메뉴",      href: "#", color: "#fce7f3", ready: false },
      { id: "wo1",      empty: true },
      { id: "wo2",      empty: true },
    ],
  },
  {
    id: "decision",
    label: "🤔 결정 장애",
    apps: [
      { id: "movie",    emoji: "🎬", title: "뭐 볼까?",           href: "/movie",  color: "#fef3c7", ready: false, large: true },
      { id: "coin",     emoji: "🪙", title: "고민 결정기",        href: "#",       color: "#fffbeb", ready: false },
      { id: "random",   emoji: "🎲", title: "아무거나 결정",       href: "#",       color: "#f8fafc", ready: false },
      { id: "weekend",  emoji: "🌈", title: "주말 뭐할까?",       href: "#",       color: "#ecfdf5", ready: false },
      { id: "happy",    emoji: "✨", title: "소확행 뽑기",        href: "#",       color: "#fdf4ff", ready: false },
      { id: "outfit",   emoji: "👗", title: "오늘 뭐 입지?",      href: "#",       color: "#fdf2f8", ready: false },
      { id: "de1",      empty: true },
      { id: "de2",      empty: true },
    ],
  },
  {
    id: "office",
    label: "💼 직장인 생존킷",
    apps: [
      { id: "quit",     emoji: "🏃", title: "퇴근 카운트",        href: "/quit", color: "#fff7ed", ready: true, isNew: true },
      { id: "meeting",  emoji: "😴", title: "회의 스킵 이유",     href: "#", color: "#f1f5f9", ready: false },
      { id: "excuse",   emoji: "😅", title: "오늘의 핑계",        href: "#", color: "#fdf2f8", ready: false },
      { id: "pomodoro", emoji: "🍅", title: "뽀모도로",            href: "#", color: "#fff1f2", ready: false },
      { id: "break",    emoji: "⏰", title: "쉬는시간 활동",       href: "#", color: "#eff6ff", ready: false },
      { id: "stress",   emoji: "💆", title: "스트레스 지수",       href: "#", color: "#f0fdf4", ready: false },
    ],
  },
  {
    id: "living",
    label: "🏠 살림 밀착",
    apps: [
      { id: "fridge",  emoji: "🖤", title: "검은봉지 체크",       href: "/fridge", color: "#f0fdf4", ready: true, large: true, isNew: true },
      { id: "split",   emoji: "💸", title: "N빵 계산기",          href: "#", color: "#ecfdf5", ready: false },
      { id: "mart",    emoji: "🛍️", title: "마트 합산 계산",      href: "#", color: "#fef9c3", ready: false },
      { id: "clean",   emoji: "🧹", title: "청소 순서 뽑기",      href: "#", color: "#f0fdf4", ready: false },
      { id: "trash",   emoji: "🗑️", title: "분리수거 알림",       href: "#", color: "#f0f9ff", ready: false },
      { id: "shop",    emoji: "📝", title: "장보기 체크리스트",    href: "#", color: "#fdf4ff", ready: false },
      { id: "le1",     empty: true },
      { id: "le2",     empty: true },
    ],
  },
  {
    id: "self",
    label: "🌟 오늘의 나",
    apps: [
      { id: "fortune",  emoji: "🔮", title: "오늘의 운세",        href: "#", color: "#fdf4ff", ready: false, large: true },
      { id: "selfcare", emoji: "🛁", title: "셀프케어 뽑기",      href: "#", color: "#ecfdf5", ready: false },
      { id: "dream",    emoji: "🌙", title: "꿈 해몽",            href: "#", color: "#eef2ff", ready: false },
      { id: "mbti",     emoji: "🧬", title: "오늘의 MBTI",       href: "#", color: "#fdf2f8", ready: false },
      { id: "tmi",      emoji: "🧠", title: "오늘의 TMI",        href: "#", color: "#fdf2f8", ready: false },
      { id: "word",     emoji: "📖", title: "오늘의 단어",        href: "#", color: "#f8fafc", ready: false },
      { id: "se1",      empty: true },
      { id: "se2",      empty: true },
    ],
  },
  {
    id: "fun",
    label: "🎉 재미 / 공유",
    apps: [
      { id: "stock",  emoji: "📈", title: "주식 수익률 짤",       href: "#", color: "#ecfdf5", ready: false, large: true },
      { id: "phrase", emoji: "💬", title: "드립 생성기",           href: "#", color: "#f0f9ff", ready: false },
      { id: "number", emoji: "🎰", title: "번호 뽑기",            href: "#", color: "#f0f9ff", ready: false },
      { id: "noise",  emoji: "🎧", title: "백색소음 뽑기",         href: "#", color: "#f1f5f9", ready: false },
      { id: "dday",   emoji: "📅", title: "디데이 계산",           href: "#", color: "#fdf4ff", ready: false },
      { id: "math",   emoji: "🔢", title: "수학 문제 생성",        href: "#", color: "#eff6ff", ready: false },
      { id: "subway", emoji: "🚇", title: "지하철 몇 분?",        href: "#", color: "#f0f9ff", ready: false },
      { id: "fe1",    empty: true },
    ],
  },
];

const NEW_APPS = CATEGORIES.flatMap((cat) => cat.apps).filter((app) => app.isNew);

function AppCard({ app }) {
  if (app.empty) return <div className={styles.emptyCard} />;

  const cls = [
    styles.card,
    app.large && styles.cardLarge,
    !app.ready && styles.cardSoon,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span className={styles.cardEmoji}>{app.emoji}</span>
      <span className={styles.cardTitle}>{app.title}</span>
      {!app.ready && <span className={styles.soonBadge}>준비중</span>}
    </>
  );

  if (app.ready) {
    return (
      <Link href={app.href} className={cls} style={{ "--card-bg": app.color }}>
        {inner}
      </Link>
    );
  }
  return (
    <div className={cls} style={{ "--card-bg": app.color }}>
      {inner}
    </div>
  );
}

function NewAppCard({ app }) {
  const inner = (
    <>
      <span className={styles.newCardEmoji}>{app.emoji}</span>
      <span className={styles.newCardTitle}>{app.title}</span>
      {app.isNew && <span className={styles.newBadge}>NEW</span>}
    </>
  );

  return (
    <Link href={app.href} className={styles.newCard} style={{ "--card-bg": app.color }}>
      {inner}
    </Link>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>

      {/* 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerLogo}>
          <span className={styles.logoIcon}>🤔</span>
          <span className={styles.logoText}>오늘 뭐 하지?</span>
        </div>
        <div className={styles.headerActions}>
          <InstallBanner />
        </div>
      </header>

      {/* 히어로 카드 */}
      <div className={styles.heroCard}>
        <p className={styles.heroLabel}>오늘 뭐 하지?</p>
        <h1 className={styles.heroTitle}>일상의 소소한 불편을<br />해소하는 미니앱 모음</h1>
        <p className={styles.heroDesc}>
          마트 장보기 합산, 냉장고 관리, 랜덤 메뉴 선택 등<br />
          산발적인 고민 대신 여기서 간편하게 해결하세요.<br />
          오늘의 식빵끈 같은 도구가 내일의 쾌적함을 만듭니다.
        </p>
        <a
          href="mailto:letters81@gmail.com?subject=새로운 앱 제안"
          className={styles.btnHero}
        >
          새로운 앱(도구) 제안하기
        </a>
      </div>

      {/* 새로 추가된 앱 */}
      {NEW_APPS.length > 0 && (
        <div className={styles.newSection}>
          <p className={styles.newSectionLabel}>🆕 새로 추가된 도구</p>
          <div className={styles.newList}>
            {NEW_APPS.map((app) => (
              <NewAppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      )}

      {/* 섹션 타이틀 */}
      <h2 className={styles.mainTitle}>오늘 뭐 하지? 🤔</h2>

      {/* 카테고리 그리드 */}
      {CATEGORIES.map((cat) => (
        <section key={cat.id} className={styles.section}>
          <h3 className={styles.sectionTitle}>{cat.label}</h3>
          <div className={styles.grid}>
            {cat.apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
