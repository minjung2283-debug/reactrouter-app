// =============================================
// Cart.jsx : 장바구니 물품들을 나열하는 컴포넌트
// =============================================

import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Cart() {
    const { items, addItem, totalQuantity, totalAmount, clearCart, removeItem } = useCart();
    if (items.length == 0) {
        return (
            <div>
                <h2>장바구니가 비었습니다.</h2>
                <Link to="/products">쇼핑 계속하기</Link>
            </div>
        )
    }
    return (
        <div>
            <h1>장바구니</h1>
            {/* 장바구니 아이템 나열 */}
            <div>
                <table>
                    <tbody>
                        {items.map((item)=>(
                            <tr key={item.id}>
                                <td style={{fontSize: '40px'}}>{item.image}</td>
                                <td>{item.name}</td>
                                <td>{item.price}원</td>
                                <td>
                                    <button onClick={()=>removeItem(item)}>-</button>
                                    {item.quantity}
                                    <button onClick={()=>addItem(item)}>+</button>
                                </td>
                                <td>{(item.price * item.quantity).toLocaleString()}원</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* 합계 출력 */}
                <hr/>
                <h3>총 {totalQuantity}개 ({totalAmount.toLocaleString()}원)</h3>
                <button onClick={clearCart}>장바구니 비우기</button>
                <Link to="/products">쇼핑 계속하기</Link>
                <button>결제하기</button>
            </div>
        </div>
    );
}