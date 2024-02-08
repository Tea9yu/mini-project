import { useEffect, useRef, useState } from "react";

export default function Summoner() {
    // 환경변수값 가져오기
    const apikey = process.env.REACT_APP_API_KEY;

    // fetch 데이터 저장
    // const [tdata, setTdata] = useState([]);

    // 화면에 재 랜더링
    // const [tags, setTags] = useState([]);

    // 아이디 입력
    const snInput = useRef();

    const getData = async (sn) => {
        sn.preventDefault() ;

        // 아이디 인코딩
        let summonerName = encodeURI(snInput.current.value);
        if (summonerName === '') {
            alert("아이디를 입력하세요.") ;
            snInput.current.focus();
            return;
        }

        let url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?`
        url = url +`api_key=${apikey}`;

        // console.log(url);

        const resp = await fetch(url) ;
        const data = await resp.json() ;

        console.log(data.response.body.items.item) ;
        // setTdata(data.response.body.items.item);
    };

    

    // 컴포넌트 업데이트
    useEffect(() => {
        //1. fetch 데이터 가져오기 tdata저장
        getData();  // 함수 호출
    }, [])

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
                                                                //  onKeyDown={"handleEnter"}
                                                                 placeholder="아이디입력" required></input>                                          
                    </div>
                </form>
            </div>
        </div>      
    </div>
  )
}
