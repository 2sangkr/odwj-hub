function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 맵기 단계별 형용사
const SPICE_ADJ = {
  0: ["순한 천사", "마일드", "착한 맛", "백탕 순백이"],
  1: ["살살 매운", "아기 불꽃", "살짝 매운"],
  2: ["불꽃 매콤", "화끈한", "매콤달콤", "두근두근 매운"],
  3: ["초불닭", "지옥 마라", "눈물 뚝뚝", "불지옥", "매운맛 레전드"],
};

// 단백질별 키워드
const PROTEIN_WORD = {
  "소고기 (100g)":   "소고기",
  "양고기 (100g)":   "양고기",
  "고기 더블 (200g)": "더블고기",
  "추가 안 함":       null,
};

// 특별 토핑 키워드 (우선순위 순)
const TOPPING_KEYWORDS = [
  { name: "치즈떡",  word: "치즈 폭탄" },
  { name: "새우완자", word: "새우" },
  { name: "고수",    word: "고수 챌린지" },
  { name: "문어완자", word: "문어" },
  { name: "푸주",    word: "두부" },
];

// 결미
const SUFFIXES = ["세트", "콤보", "조합", "스페셜", "마라"];

// 특수 조합 (조건 맞으면 고정 이름 반환)
function checkSpecial(state) {
  const toppingNames = state.toppings.map((t) => t.name);
  const level = state.spiceLevel?.level ?? 0;
  const protein = state.protein?.name ?? "";
  const count = state.toppings.length;

  if (level === 3 && state.mayu > 0 && toppingNames.includes("고수"))
    return "🔥 지옥문 개방 세트";
  if (level === 0 && state.peanutSauce)
    return "🤍 달달 천사 세트";
  if (protein === "고기 더블 (200g)" && level >= 2)
    return "💪 고기 불꽃 풀옵션";
  if (count >= 9)
    return "👑 풀옵션 마라킹";
  if (level === 3 && count >= 7)
    return "😈 매운맛 레전드 세트";

  return null;
}

export function generateComboName(state) {
  const special = checkSpecial(state);
  if (special) return special;

  const toppingNames = state.toppings.map((t) => t.name);
  const level = state.spiceLevel?.level ?? 0;

  const adj    = pick(SPICE_ADJ[level]);
  const suffix = pick(SUFFIXES);

  // 특징 토핑이 있으면 그걸 중간에 넣기
  const featured = TOPPING_KEYWORDS.find((k) => toppingNames.includes(k.name));
  if (featured) return `${adj} ${featured.word} ${suffix}`;

  // 단백질 키워드
  const protein = PROTEIN_WORD[state.protein?.name ?? ""] ;
  if (protein) return `${adj} ${protein} ${suffix}`;

  return `${adj} 마라 ${suffix}`;
}
