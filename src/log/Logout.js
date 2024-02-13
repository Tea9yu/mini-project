import React from "react";
import { Link } from "react-router-dom";

export default function Logout({ onLogout }) {
  return (
    <div>
      <h1>안녕하세요!</h1>
      <div>로그아웃되었습니다.</div>
      <Link to="/" onClick={onLogout}>
        로그인
      </Link>
    </div>
  );
}
