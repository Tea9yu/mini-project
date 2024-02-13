import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const userIdRef = useRef();
  const userPwRef = useRef();

  const handleLogin = () => {
    const userId = userIdRef.current.value;
    const userPw = userPwRef.current.value;

    // 예시로 userId가 "user"이고 userPw가 "pw1234"일 때 로그인 성공
    if (userId === "user" && userPw === "pw1234") {
      onLogin(userId);
    } else {
      alert("로그인 실패");
    }

    console.log(userId);
    console.log(userPw)
  };

  return (
    <div>
      <h1>로그인 하세요.</h1>
      <form>
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
          <input type="button" value="로그인" onClick={handleLogin} />
        </div>
      </form>
    </div>
  );
}
