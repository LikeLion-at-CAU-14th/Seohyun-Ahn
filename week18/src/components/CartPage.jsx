import styled from "styled-components";
import React, { useState } from 'react'
import useCartStore from "../store/useCartStore";


function CartPage({ onClose }) {   // props로 onClose 받기 수정 -> 과제3 모달닫기 위해
  const cartItems = useCartStore(((state) => state.cartItems));
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity); // 과제1 (수량 조절)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0); // 과제2 (장바구니 합계)

  const [isOrderComplete, setIsOrderComplete] = useState(false); // 과제3 - 주문 완료 여부를 기억하는 상태 (기본값: false)

  const handleCheckout = () => {
    clearCart();              // 장바구니 비우기
    setIsOrderComplete(true); // 주문 완료 화면으로 전환
  }; // 과제3 - 결제하기 버튼 눌렀을 때 실행할 함수

  const clearCart = useCartStore((state) => state.clearCart);   // 과제3 - 장바구니 비우기
  
  // 과제 3 - 주문 완료 상태면 완료 화면 보여주기
  if (isOrderComplete) {
  return (
    <Section>
      <OrderComplete>주문이 완료되었습니다.</OrderComplete>
      <CheckoutButton onClick={onClose}>
        닫기
      </CheckoutButton>
    </Section>
  );
  }
  

  return (
    <Section>
      <SectionTitle>장바구니</SectionTitle>
      {cartItems.length === 0 ? (
        <Empty>담긴 상품이 없습니다.</Empty>
      ) : (
        <> 
        <List>
          {cartItems.map((item) => (
            <Item key= {item.id}>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>{item.price?.toLocaleString()}원</ItemPrice>
              
              {/* 과제 1 */}
              <QuantityControl>
                <QtyButton onClick={() => decreaseQuantity(item.id)}>-</QtyButton>
                <span>{item.quantity}개</span>
                <QtyButton onClick={() => increaseQuantity(item.id)}>+</QtyButton>
              </QuantityControl> 

              <RemoveButton onClick = {() => removeFromCart(item.id)}>삭제</RemoveButton>
            </Item>
          ))}
        </List>
        {/* index 대신 item.id를 사용하도록 수정 (bc id는 상품 고유의 값이라서, 배열 안에서 앞뒤로 위치가 바뀌어도 버그 X) */}
      
        {/* 과제 2 */}
        <Total>Total: {totalPrice.toLocaleString()}원</Total>

        {/* 과제 3 - 결제하기 버튼 */}
        <CheckoutButton onClick={handleCheckout}>결제하기</CheckoutButton>

      </> 
      )}
    </Section>
  );
}

export default CartPage

const Section = styled.section``;

const SectionTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const Empty = styled.p`
  font-size: 13px;
  color: #999;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #fafafa; 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const ItemName = styled.span`
  flex: 1;
  font-size: 13px;
  color: #1a1a1a;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
`;

const QtyButton = styled.button`
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  background: #fff;
  cursor: pointer;
  font-size: 13px;
`;

const ItemPrice = styled.span`
  font-size: 13px;
  color: #666;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  font-size: 12px;
  padding: 5px 10px;
  border: 1px solid #d33;
  border-radius: 6px;
  background: #fff;
  color: #d33;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #d33;
    color: #fff;
  }
`;

const Total = styled.p`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f1f1f1;
  text-align: right;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
`;

const CheckoutButton = styled.button`
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: #ff6b35;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e85a2a;
  }
`;

const OrderComplete = styled.p`
  text-align: center;
  padding: 40px 0;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
`;