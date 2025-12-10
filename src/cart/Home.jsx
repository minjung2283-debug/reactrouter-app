// ====================================
// Home.jsx : 메인페이지. 시작 정보 제공
// ====================================
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>🛒Electro Shopping Mall</h1>
            <p>베스트 전자 쇼핑몰에 오신 것을 환영합니다.</p>
            <Link to='/products'>쇼핑 시작하기 ➡️</Link> 
        </div>
    )
}