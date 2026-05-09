// 마라탕 메뉴 전체 데이터 (Step 1~4)

export const noodles = [
  { id: "n1", name: "옥수수면", emoji: "🌽", isPopular: true },
  { id: "n2", name: "중국당면", emoji: "🍜", isPopular: true },
  { id: "n3", name: "분모자",   emoji: "🍡", isPopular: true },
  { id: "n4", name: "뉴진면",   emoji: "🍝", isPopular: false },
  { id: "n5", name: "라면사리", emoji: "🌀", isPopular: true },
];

export const toppings = {
  group1: {
    label: "1군 (두부)",
    items: [
      { id: "t1_1", name: "푸주",     emoji: "🫘", isPopular: true },
      { id: "t1_2", name: "건두부",   emoji: "🟦", isPopular: false },
      { id: "t1_3", name: "얼린두부", emoji: "🧊", isPopular: true },
      { id: "t1_4", name: "두부피",   emoji: "🌰", isPopular: false },
    ],
  },
  group2: {
    label: "2군 (버섯)",
    items: [
      { id: "t2_1", name: "팽이",   emoji: "🍄",   isPopular: true },
      { id: "t2_2", name: "목이",   emoji: "🍄‍🟫", isPopular: false },
      { id: "t2_3", name: "백목이", emoji: "🤍",   isPopular: true },
      { id: "t2_4", name: "새송이", emoji: "🎪",   isPopular: false },
      { id: "t2_5", name: "느타리", emoji: "🌸",   isPopular: false },
    ],
  },
  group3: {
    label: "3군 (완자/햄)",
    items: [
      { id: "t3_1", name: "비엔나",   emoji: "🌭", isPopular: true },
      { id: "t3_2", name: "스팸",     emoji: "🥫", isPopular: true },
      { id: "t3_3", name: "문어완자", emoji: "🐙", isPopular: false },
      { id: "t3_4", name: "새우완자", emoji: "🦐", isPopular: true },
      { id: "t3_5", name: "메추리알", emoji: "🥚", isPopular: false },
    ],
  },
  group4: {
    label: "4군 (떡/기타)",
    items: [
      { id: "t4_1", name: "치즈떡",     emoji: "🧀", isPopular: true },
      { id: "t4_2", name: "고구마떡",   emoji: "🍠", isPopular: true },
      { id: "t4_3", name: "수제비",     emoji: "🥣", isPopular: false },
      { id: "t4_4", name: "분모자(토핑)", emoji: "🍡", isPopular: false },
      { id: "t4_5", name: "감자",       emoji: "🥔", isPopular: false },
    ],
  },
  group5: {
    label: "5군 (채소)",
    items: [
      { id: "t5_1", name: "숙주",   emoji: "🌱", isPopular: true },
      { id: "t5_2", name: "청경채", emoji: "🥬", isPopular: true },
      { id: "t5_3", name: "배추",   emoji: "🥬", isPopular: false },
      { id: "t5_4", name: "고수",   emoji: "🌿", isPopular: false },
    ],
  },
};

export const proteins = [
  { id: "p1", name: "소고기 (100g)",   emoji: "🥩", isPopular: true },
  { id: "p2", name: "양고기 (100g)",   emoji: "🐑", isPopular: true },
  { id: "p3", name: "고기 더블 (200g)", emoji: "🍖", isPopular: false },
  { id: "p4", name: "추가 안 함",       emoji: "❌", isPopular: false },
];

export const spiceLevels = [
  { id: "s0", level: 0, name: "0단계 (백탕)",  emoji: "🤍", isKidFriendly: true },
  { id: "s1", level: 1, name: "1단계",          emoji: "🌶️", isKidFriendly: true },
  { id: "s2", level: 2, name: "2단계",          emoji: "🔥", isKidFriendly: false },
  { id: "s3", level: 3, name: "3단계 (매운맛)", emoji: "💀", isKidFriendly: false },
];
