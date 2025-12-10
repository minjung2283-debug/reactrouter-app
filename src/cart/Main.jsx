// =======================================================
// Main.jsx : 컨테이너 컴포넌트. 모든 페이지의 공통 레이아웃
// =======================================================

import { Link, NavLink, Outlet } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Main() {
    const { totalQuantity } = useCart();
    return (
        <div>
            {/* 네비게이션 */}
            <div>
                <Link to='/'>ElectroShop</Link>
            </div>
            <div>
                <NavLink to='/'>홈</NavLink>
                <NavLink to='/products'>제품</NavLink>
                <NavLink to='/cart'>장바구니({totalQuantity})</NavLink>
            </div>
            {/* 페이지 컨텐츠 */}
            <main>
                <Outlet />
            </main>
        </div>
    )
}