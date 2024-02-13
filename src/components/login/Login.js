import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm';
import Logout from './Logout';
import { useRecoilState } from 'recoil';
import { stLogin } from './StAtom';

export default function Login() {
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useRecoilState(stLogin) ;

    const handleLogin = (username) => {
        localStorage.setItem('user', username);
        setUser(username);
        setIsLogin(true);
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setIsLogin(false);
    }

    useEffect(() => {
        const lsUser = localStorage.getItem('user');
        if (lsUser) {
            setUser(lsUser);
            setIsLogin(true)
        }
        else {
            setIsLogin(false);
        }
    }, []);
    return (
        <main>
            <div>
                {/* {isLogin ? <Logout /> : <LoginForm />} */}
                {user ? <Logout user={user} onLogout={handleLogout} />
                      : <LoginForm onLogin={handleLogin} />}
                {/* {<LoginForm />}
                {<Logout />} */}
            </div>
        </main>
    )
}
