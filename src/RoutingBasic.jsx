// RoutingBasic.jsx
import { useState } from 'react';
import { BrowserRouter, NavLink, Route, Routes, Outlet, Link, useParams, useNavigate, useRoutes } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    displayL grid;
    grid-template-columnsL 180px auto
    `

const Title = styled.h1`
    color: orange;
    padding: 16px;
    `

const Main = ({ user }) => {
    const {username, password} = user;
    return (
        <div>
            <nav style={{display: 'flex'}}>
                <p>
                    <NavLink to='/'>Home</NavLink>
                </p>
                <p>
                    <NavLink to='/about'>About</NavLink>
                </p>
                <p>
                    <NavLink to='/blog'>Blog</NavLink>
                </p>
                <p>
                    <NavLink to='/admin'>Admin</NavLink>
                </p>
                <p>
                    {(username == '') ? <NavLink to='/login'>Login</NavLink>
                    : (
                        <>
                        <span>{username}님 환영합니다.</span>
                        <NavLink to='/logout'>Logout</NavLink>
                        </>
                    )}
                </p>
            </nav>
            <Outlet/> {/* 내포된 컴포넌트 표시하는 자리 */}
        </div>
    )
}

const Home = () => {
    const MyButton = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #BF4F74;
    color: #BF4F74;
    margin: 0 1em;
    padding: 0.25em 1em;
    `;
    return (
        <div>
            <Title>HOME page component</Title>
            <p>메인페이지...</p>
            <button>Main Button</button>
            <MyButton>Styled Button</MyButton>
            <MyButton>Second</MyButton>
        </div>
    );
}
const About = () => {
    return (
        <div>
            <h1>ABOUT page component</h1>
            <p>소개글 페이지...</p>
        </div>
    );
}
// 블로그 페이지에 나올 포스트 데이터
const PostData = {
    post1: {
        title: '올해 가장 재밌는 영화',
        content: '영화 소개 글 .....',
    },
    post2: {
        title: '올해 가장 재밌는 공연',
        content: '공연 소개 글 .....',
    },
    post3: {
        title: '올해 가장 재밌는 뮤지컬',
        content: '뮤지컬 소개 글 .....',
    },
    post4: {
        title: '올해 가장 재밌는 도서',
        content: '도서 소개 글 .....',
    }
};
// 포스트 데이터를 나열하는 컴포넌트
const PostList = () => {
    return (
        <ul>
            {
                Object.entries(PostData).map(([postid, { title }]) => (
                    <li key={postid}>
                        <Link to={`/blog/${postid}`}>{title}</Link>
                    </li>
                ))
            }
        </ul>
    )
};
const Post = () => {
    // URL 주소에서 매개변수 가져옴
    const { postid } = useParams();
    const post = PostData[postid];
    const { title, content } = post;
    return (
        <div>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    )
}
const Blog = () => {
    return (
        <div>
            <h1>BLOG page component</h1>
            <p>블로그 글 페이지...</p>
            <Outlet/>
        </div>
    );
}
const NoPage = () => {
    return (
        <div>
            <h1>404: Not Found Error</h1>
            <p>Page is not found.</p>
        </div>
    )
}
const Login = ({ setUser }) => {
    const [input, setInput] = useState({
        username: '',
        password: ''
    });
    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    const handleLogin = () => {
        if (input.username == 'admin' && input.password == '123') {
            setUser({...input, admin: true});
        } else {
            setUser({...input, admin: false});
        }
    }
    return (
        <div>
            <h2>User Login</h2>
            <span>Username : </span>
            <input type='text' onChange={handleInput} name="username" />
            <span>Password : </span>
            <input type='password' onChange={handleInput} name="password" />
            <button onClick={handleLogin}>:Login</button>
            <p>User : {input.username} / {input.password}</p>
        </div>
    )
}
const Logout = ({ setUser, navigate }) => {
    setUser({
        username: '',
        password: '',
        admin: false
    });
    /*
    return <Navigate to='/' replace/> */
    navigate('/');
}
const ProtectPage = ({ user, children }) => {
    if (!user.admin) { // 관리자로 로그인한게 아니면
        return (
            <Navigate to='/login' replace/>
        );
    }
    return children;
}
const Admin = () => {
    return (
        <div>
            <h1>ADMIN page component</h1>
            <p>관리자 페이지...</p>
            <Outlet/>
        </div>
    );
}
const AppRouter = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        admin: false
    });
    // 페이지 이동을 처리하는 함수 반환
    const navigate = useNavigate();
    return (
        <Routes>
            <Route path='/' element={<Main user={user}/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/about' element={<About/>}/>
                <Route path='/blog' element={<Blog/>}>
                    <Route index element={<PostList/>}/>
                    <Route path=':postid' element={<Post/>}/>
                </Route>
                <Route path='/login' element={<Login setUser={setUser}/>}/>
                <Route path='/logout' element={<Logout setUser={setUser} navigate={navigate}/>}/>
                <Route path='/admin' 
                    element={<protectePage user={user}><Admin/></protectePage>} />
                <Route path='*' element={<NoPage/>}/>
            </Route> 
        </Routes>
    );
}

function MyRoutes() {
    // Routes 데이터를 객체 형식으로 정의
    const routes = useRoutes([
        {path: '/', element: <Home/>},
        {path: '/about', element: <About/>},
        {path: '/blog', element: <Blog/>,
            children: [
                {index: true, element: <PostList/>},
                {path: ':postid', element: <Post/>}
            ]
        },
    ]);
    return routes;
}

export default function RoutingBasic() {
    return (
        <BrowserRouter>
            <nav>
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/about'>About</NavLink>
                <NavLink to='/blog'>Blog</NavLink>
            </nav>
            <MyRoutes />
        </BrowserRouter>
    );
}