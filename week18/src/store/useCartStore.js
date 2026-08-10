import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// store파일안에는 state(데이터), action(로직) 넣어야함
const useCartStore = create(
  persist(
  (set) => ({
  cartItems: [],
  
  addToCart: (product) =>
    set((state) => {
      // 1. 이미 담긴 상품인지 id로 확인
      // addToCart가 실행될 때 set 안에서 바로 조건 분기, state.cartItems.find(...)로 같은 id의 상품이 이미 있는지 검사
      const existingItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      // 2. 있으면 -> 수량만 +1
      // map()으로 전체 배열을 돌면서, 그 상품만 quantity + 1 해서 새 배열 반환
      if (existingItem) {
         return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // 3. 없으면 -> 새 상품 추가 
      // 기존 배열 뒤에 { ...product, quantity: 1 }을 추가 (처음 담기니까 수량 1로 시작)
      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }),

  // page 수정에 따라 store도 id를 받도록 통일
  removeFromCart: (id) =>
    set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      // 수량 +1
      increaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // 수량 -1 (최소 1개)
      decreaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),

    // 과제3 - (결제 버튼 누르면) 장바구니 비우기
    // cartItems를 그냥 빈 배열 []로 통째로 바꿔치기 함
      clearCart: () => set({ cartItems: [] }),

    }),
    { name: 'cart-storage' }
  )
);

export default useCartStore;