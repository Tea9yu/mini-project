import { useEffect, useRef } from "react";

export default function Ak() {
    // 환경변수값 가져오기
    const apikey = process.env.REACT_APP_API_KEY;

    // 아이디 입력
    const snInput = useRef();

    const getData = async (sn) => {
        // sn이 정의되어 있지 않으면 더 이상 진행하지 않음
        if (!sn) return;

        // 아이디 인코딩
        let summonerName = encodeURI(sn);
        if (summonerName === '') {
            alert("아이디를 입력하세요.");
            snInput.current.focus();
            return;
        }

        let url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apikey}`;
        
        const resp = await fetch(url);
        const data = await resp.json();
        
        // 예시로 소환사의 id 출력
        console.log(data.id);
    };

    // 컴포넌트 업데이트
    useEffect(() => {
        //1. fetch 데이터 가져오기 tdata저장
        getData(snInput.current.value);  // 함수 호출 시 인자 전달
    }, []); // 의존성 배열에 빈 배열 추가

    return (
        <div>
            <div>
                <div>
                    <form name="kform" className="my-5 w-4/5 flex justify-center items-center">
                        <div className=" w-1/2 mx-4">
                            <input type="text" ref={snInput} id="txt1" className="block w-full p-4 ps-10 text-sm
                                text-gray-900 border border-gray-300 rounded-lg
                                bg-gray-50
                                focus:ring-blue-500
                                focus:border-blue-500
                                dark:bg-gray-700
                                dark:border-gray-600
                                dark:placeholder-gray-400
                                dark:text-white
                                dark:focus:ring-blue-500
                                dark:focus:border-blue-500"
                                placeholder="아이디입력" required></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
