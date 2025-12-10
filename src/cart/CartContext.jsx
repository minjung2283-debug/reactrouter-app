// ===============================================
// CartContext.jsx : 전역 상태 관리를 위한 컨텍스트 관리 컴포넌트
// ===============================================

import { createContext, useContext, useReducer } from "react";

// 장바구니 상태변수의 초기 상태
const initialState = {
    items: [], // 장바구니 배열
    totalAmount: 0, // 장바구니 물품의 총 금액
    totalQuantity: 0 // 장바구니 물품 개수
};

// Reducer 함수 정의 : (현재상태, 액션) => 새로운 상태 반환
function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            // 추가할 물품이 장바구니에 있는지 확인하기
            const existingIndex = state.items.findIndex(
                item => item.id === action.payload.id // 같은 ID 값을 가지는 물품의 배열 색인을 찾기
            );
            let uploadedItems;
            if (existingIndex >= 0) { // 이미 장바구니에 존재하는 물품인 경우 수량 증가
                uploadedItems = [...state.items];
                uploadedItems[existingIndex].quantity += 1; // 수량 증가
            } else { // 장바구니에 물품을 추가
                uploadedItems = [...state.items, {...action.payload, quantity: 1}];
            }
            return {
                ...state,
                items: uploadedItems,
                totalQuantity: state.totalQuantity + 1,
                totalAmount: state.totalAmount + action.payload.price
            };
        }
        case 'REMOVE_ITEM': { // 수량을 감소하거나 1인 경우는 물품을 삭제하기
            const existingIndex = state.items.findIndex(
                item => item.id === action.payload.id // 같은 ID 값을 가지는 물품의 배열 색인을 찾기
            );
            const item = state.items[existingIndex];
            let uploadedItems;
            if (item.quantity === 1) {
                uploadedItems = state.items.filter(
                    item => item.id !== action.payload.id
                );
            } else {
                // 수량 감소
                uploadedItems = [...state.items];
                uploadedItems[existingIndex].quantity -= 1;
            }
            return {
                ...state,
                items: uploadedItems,
                totalQuantity: state.totalQuantity - 1,
                totalAmount: state.totalAmount - item.price
            };
        }
        case 'CLEAR_CART': {
            return initialState; // 초기화 상태로 반환
        }
        default: return state;
    }
    
}

// Context 생성
const CartContext = createContext();

// 컨텍스트 제공자 컴포넌트 생성
export function CartProvider({ children }) {
    const products = [
        {id:1, name: '무선 마우스',  price: 29000, image: '🖱️', desc: '화이트 색상의 빠른 블루투스 마우스'},
        {id:2, name: '기계식 키보드',  price: 150000, image: '⌨️', desc: '게임 플레이에 최적화된 키보드'},
        {id:3, name: '와이드 모니터',  price: 450000, image: '🖥️', desc: 'OLED 화질의 와이드 모니터'},
        {id:4, name: '헤드폰',  price: 330000, image: '🎧', desc: '화이트 색상의 빠른 블루투스 마우스'},
        {id:5, name: '웹캠',  price: 29000, image: '📷', desc: '화이트 색상의 빠른 블루투스 마우스'},
        {id:6, name: '마이크',  price: 29000, image: '🎙️', desc: '화이트 색상의 빠른 블루투스 마우스'}
    ];

    // useReducer 호출
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // addItem 함수 정의
    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    }

    const removeItem = (item) => {
        dispatch({ type: 'REMOVE_ITEM', payload: item });
    }

    // clearCart 함수 정의
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    }

    // children에게 제공할 데이터 목록
    const value = {
        PRODUCTS: products,
        items: state.items,     //장바구니 전달
        addItem,                // 장바구니에 물품을 추가하는 함수
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
        clearCart,
        removeItem
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// 커스텀 후크 함수 정의
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}