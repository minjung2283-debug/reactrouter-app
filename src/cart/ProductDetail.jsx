// ==========================================================
// ProductDetail.jsx : 선택한 제품의 상세정보를 보여주는 페이지
// ==========================================================

import { Link, useNavigate, useParams } from "react-router-dom"
import { useCart } from "./CartContext";

export default function ProductDetail() {
    const { id } = useParams(); // URL 주소 줄에 전달되는 파라미터 가져오기
    const { PRODUCTS, addItem } = useCart(); // context 나옴. 구조분해해서 원하는 항목 꺼내옴.
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        addItem(product);
        alert(`${product.name} 물품이 장바구니에 추가되었습니다.`);
        // 장바구니로 이동하기
        navigate('/cart');
    }

    const product = PRODUCTS.find(p => p.id === Number(id));
    if (!product) {
        return (
            <div>
                <h3>제품을 찾을 수 없습니다.</h3>
                <Link to='/products'>목록으로 돌아가기</Link>
            </div>
        )
    }
    return (
        <div>
            <h2>{product.name}</h2>
            <p style={{fontSize: '40px'}}>{product.image}</p>
            <p>{product.price}</p>
            <p>{product.desc}</p>
            <button onClick={()=>handleAddToCart(product)}>장바구니 담기</button>
        </div>
    )
}