import { useRef } from "react"


export default function LoginForm({onLogin}) {
    const userId = useRef();
    const userPw = useRef();

    const handleLogin = () => {
        if (userId === "user" & userPw ==='pw1234') {
            onLogin(userId);
        }
        else {
            alert("로그인 실패") ;
        }
    }
  return (
    <section>
        <div>
            <div>
                <div>
                    <div>
                        <form>
                            <div>
                                <input 
                                    type="text"
                                    ref={userId}
                                    id="userId"
                                    placeholder="아이디를 입력하세요"
                                />
                            </div>
                            <div>
                                <input 
                                    type="password"
                                    ref={userPw}
                                    id="userPw"
                                    placeholder="비밀번호를 입력하세요"
                                />
                            </div>
                            <div>
                                <input 
                                    type="button"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
  )
}
