import { Link } from "react-router-dom";

export default function Logout({ user, onLogout }) {

    return (
        <div>
            <section>
                <div>
                    <div>
                        <div>
                            <h1>
                                안녕하세요!
                            </h1>
                            <form>
                                <div>
                                    {user}님 반갑습니다.
                                </div>
                                <Link to='/' onClick={onLogout} >로그아웃</Link>
                            </form>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )


}
