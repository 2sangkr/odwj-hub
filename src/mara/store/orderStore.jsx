"use client";

// 전역 주문 상태 관리 (React Context + useReducer)
// 각 Step에서 선택된 값을 저장하고 Receipt에 전달

import { createContext, useContext, useReducer } from "react";

const initialState = {
  noodle: null,        // Step 1: 선택된 면
  toppings: [],        // Step 2: 선택된 토핑 목록
  heldToppings: [],    // Step 2: 홀드(고정)된 토핑 (랜덤 모드 전용)
  protein: null,       // Step 3: 선택된 단백질
  spiceLevel: null,    // Step 4: 맵기 단계
  peanutSauce: false,  // Step 4: 땅콩소스 여부
  mayu: 0,             // Step 4: 마유(얼얼한 맛) 강도 (0~3)
  isFamilyMode: false, // 가족 필터 모드
  currentStep: 1,      // 현재 진행 단계 (1~4)
};

function orderReducer(state, action) {
  switch (action.type) {
    case "SET_NOODLE":
      return { ...state, noodle: action.payload };
    case "SET_TOPPINGS":
      return { ...state, toppings: action.payload };
    case "TOGGLE_HOLD_TOPPING": {
      const id = action.payload;
      const held = state.heldToppings.includes(id)
        ? state.heldToppings.filter((t) => t !== id)
        : [...state.heldToppings, id];
      return { ...state, heldToppings: held };
    }
    case "SET_PROTEIN":
      return { ...state, protein: action.payload };
    case "SET_SPICE":
      return { ...state, spiceLevel: action.payload };
    case "SET_PEANUT_SAUCE":
      return { ...state, peanutSauce: action.payload };
    case "SET_MAYU":
      return { ...state, mayu: action.payload };
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "TOGGLE_FAMILY_MODE":
      return { ...state, isFamilyMode: !state.isFamilyMode };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
