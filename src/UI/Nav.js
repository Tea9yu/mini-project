import { Link } from "react-router-dom";


export default function Nav() {
  return (
    <div className="flex justify-center items-center gap-4">
        <Link to="/" type="button">홈</Link>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <Link to="/list" type="button">게시판</Link>
        &nbsp;&nbsp; | &nbsp;&nbsp;
        <Link to="/login" type="button">로그인</Link>
        <hr/>
    </div>
  )
}
