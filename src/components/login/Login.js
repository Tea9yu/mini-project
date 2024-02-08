import React, { useEffect } from 'react'

export default function Login() {
    const [user, setUser] = useState(null);

    const handleLogin = (username) => {
        localStorage.setItem('user', username);
        setUser(username);
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    useEffect(() => {
        const lsUser = localStorage.getItem('user');
        if (lsUser) setUser(lsUser);
    }, []);
    return (
        <main>
            <div>
                {user ? <Logout user={user} onLogout={handleLogout} />
                      : <LoginForm onLogin={handleLogin} />}

            </div>
        </main>
    )
}
