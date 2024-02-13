import { useRef } from "react"

export default function LoginForm({ onLogin }) {
    const userIdRef = useRef();
    const userPwRef = useRef();
    
    const handleLogin = (e) => {
        const userId = userIdRef.current.value;
        const userPw = userPwRef.current.value;

        e.preventDefault(); // 기본 폼 제출 동작 방지
        if (userId === "user" && userPw === 'pw1234') {
            setLoginState(true);
            onLogin(userId.current.value);
            alert("로그인 성공");
        }
        else {
            alert("로그인 실패");
        }
    }
    return (
        <div>
            <section>
                <div>
                    <div>
                        <div>
                            <div>
                                <h1>
                                    로그인 하세요.
                                </h1>
                                <form onSubmit={handleLogin}>
                                    <div>
                                        <input
                                            type="text"
                                            ref={userIdRef}
                                            id="userId"
                                            placeholder="아이디를 입력하세요"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="password"
                                            ref={userPwRef}
                                            id="userPw"
                                            placeholder="비밀번호를 입력하세요"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="submit"
                                            value="로그인"                                            
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
