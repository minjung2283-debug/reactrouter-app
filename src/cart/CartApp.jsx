// =============================================
// CartApp.jsx : React Routing 설정. 메인컴포넌트

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Home from "./Home";
import Product from "./Product";
import { CartProvider } from "./CartContext";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";

// =============================================

export default function CartApp () {
    return (
        <BrowserRouter>
            <CartProvider>
                <Routes>
                    <Route path='/' element={<Main />}>
                        <Route path="/" element={<Home />} />
                        <Route path="products" element={<Product />} />
                        <Route path="products/:id" element={<ProductDetail />}/>
                        <Route path="Cart" element={<Cart />} />
                    </Route>
                </Routes>
            </CartProvider>
        </BrowserRouter>
    )
}
