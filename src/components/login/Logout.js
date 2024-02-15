import React from "react";
import { Link } from "react-router-dom";

export default function Logout({user, onLogout }) {
  return (
    <div className="w-full h-full">
      <section className="flex flex-col justify-center items-center h-full ">
      <h1>로그인되었습니다.</h1>
      <div>{user} 님 안녕하세요!</div>
      <Link to="/" onClick={onLogout}>
        로그아웃
      </Link>
      </section>
    </div>
  );
}
