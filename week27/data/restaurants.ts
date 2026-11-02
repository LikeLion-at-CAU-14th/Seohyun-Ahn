export type Restaurant = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  menu: string;
  price: number;
  comment: string;
};

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "아기사자 분식",
    category: "분식",
    emoji: "🍜",
    menu: "라볶이",
    price: 6000,
    comment: "QA 기간에 여기 없었으면 못 버텼다",
  },
  {
    id: 2,
    name: "멋사 카츠",
    category: "일식",
    emoji: "🍣",
    menu: "치즈 돈까스",
    price: 9500,
    comment: "치즈가 접시 밖으로 탈출함",
  },
  {
    id: 3,
    name: "밤샘 순대국밥",
    category: "한식",
    emoji: "🍲",
    menu: "순대국밥",
    price: 9000,
    comment: "해커톤 끝나고 먹으면 눈물 나는 맛",
  },
  {
    id: 4,
    name: "리액트 버거",
    category: "양식",
    emoji: "🍔",
    menu: "더블 치즈버거",
    price: 8500,
    comment: "한 손엔 버거, 한 손엔 키보드",
  },
  {
    id: 5,
    name: "사자 딤섬",
    category: "중식",
    emoji: "🥟",
    menu: "샤오롱바오",
    price: 4500,
    comment: "버그는 잡고, 육즙은 터뜨리고",
  },
  {
    id: 6,
    name: "프론트 케이크",
    category: "디저트",
    emoji: "🍰",
    menu: "딸기 생크림 케이크",
    price: 7500,
    comment: "에러의 쓴맛 뒤엔 케이크의 단맛",
  },
];