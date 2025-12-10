// ================================================
// Product.jsx : 제품을 나열해서 보여주는 페이지 생성
// ================================================

import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

/*
// 제품 데이터 생성
    const products = [
        {id:1, name: '무선 마우스',  price: 29000, image: '🖱️', desc: '화이트 색상의 빠른 블루투스 마우스'},
        {id:2, name: '기계식 키보드',  price: 150000, image: '⌨️', desc: '게임 플레이에 최적화된 키보드'},
        {id:3, name: '와이드 모니터',  price: 450000, image: '🖥️', desc: 'OLED 화질의 와이드 모니터'},
        {id:4, name: '헤드폰',  price: 330000, image: '🎧', desc: '화이트 색상의 빠른 블루투스 마우스'},
        {id:5, name: '웹캠',  price: 29000, image: '📷', desc: '화이트 색상의 빠른 블루투스 마우스'},
        {id:6, name: '마이크',  price: 29000, image: '🎙️', desc: '화이트 색상의 빠른 블루투스 마우스'}
    ];
    */
export default function Product() {
    const { PRODUCTS, addItem } = useCart();
    const handleAddToCart = (product) => {
        addItem(product);
        alert(`${product.name} 물품이 장바구니에 추가되었습니다.`);
    }
    return (
        <div>
            <h1>제품 목록</h1>
            <div>
                <table>
                    {PRODUCTS.map(product => (
                        <tr key={product.id}>
                            <td style={{fontSize: '50px'}}>{product.image}</td>
                            <td style={{fontWeight: 'bord'}}>{product.name}</td>
                            <td>{product.price}원</td>
                            <td>
                                <Link to={`/products/${product.id}`}>상세보기</Link>
                                <td>
                                    <button onClick={() => handleAddToCart(product)}>담기</button>
                                </td>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}