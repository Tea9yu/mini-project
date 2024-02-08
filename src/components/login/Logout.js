

export default function Logout({ user, onLogout }) {

    return (
        <section>
            <div>
                <div>
                    <div>
                        <div>
                            <form>
                                <div>
                                    {user}님 반갑습니다.
                                </div>
                                <div>
                                    <input
                                        type="button"
                                        value="Sign out"
                                        className="w-full rounded-md border"
                                        onClick={onLogout}
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
