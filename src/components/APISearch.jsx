import React, { useState, useRef, useEffect } from "react";
import axios from "axios";


const APISearch = () => {
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState(null);

  const summonerNameRef = useRef();

  const apiKey = process.env.REACT_APP_API_KEY;

  console.log("Riot");

  const checkKorean = (str) => {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    return korean.test(str);
  }

  // summoer api로 유저 데이터 가져오는 부분


  const [tier, setTier] = useState("");
  const [oow, setOow] = useState("");
  const [win, setWin] = useState("");
  const [lose, setLose] = useState("");
  const [tierImgSrc, setTierImgSrc] = useState("");
  const [profileImgSrc, setProfileImgSrc] = useState("");


  const tierRef = useRef(null);
  const oowRef = useRef(null);
  const winRef = useRef(null);
  const loseRef = useRef(null);
  const tierImgRef = useRef(null);
  // const tier = document.querySelector("#tierName")
  // const oow = document.querySelector("#win-lose-percent")
  // const win = document.querySelector("#win")
  // const lose = document.querySelector("lose")

  let WIN = 0
  let LOSE = 0
  let DRAW = 0



  // handleSearch 내부에서 사용할 변수를 사위 스코프로 이동합니다.
  let summonerId
  let summonerPuuid

  const handleSearch = async () => {
    console.log(summonerNameRef.current.value);

    const sr = summonerNameRef.current.value;
    setSummonerName(sr);
    try {
      if (!sr) {
        alert("소환사 이름을 입력하세요.");
        return;
      }


      // const encodedSummonerName = encodeURIComponent(summonerName); // 한글 닉네임을 인코딩합니다.
      let url = '';
      if (checkKorean(sr)) {
        url = encodeURI(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sr}?api_key=${apiKey}`);
      }
      else {
        url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sr}?api_key=${apiKey}`;
      }

      // Riot API Key를 적절한 값으로 변경해야 합니다.
      console.log(url);
      const response = await axios.get(url);
      console.log("소환사API호출")
      console.log(response);
      console.log(response.data.name);

      if (!response.data) {
        alert("소환사 정보를 찾을 수 없습니다.");
        return;
      }

      summonerId = response.data.id
      summonerPuuid = response.data.puuid

      // console.log(response.data);
      setSummonerData(response.data);

      await leagueAPI();  // 리그 API 배열로 호출
      await matchInfo(); // 매치 API 배열로 호출
    } catch (error) {
      console.error("Error fetching summoner data:", error);
      alert("소환사 정보를 가져오는 중에 오류가 발생했습니다.");
    }

  };

  // 리그API 불러오기
  const leagueAPI = async () => {

    try {
      const leagueInfo = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`;
      const response = await axios.get(leagueInfo);
      console.log(summonerId)
      console.log(summonerPuuid)
      console.log("리그정보 호출");
      console.log(response);

      // tier.textContent = response.data[0].tier + " " + response.data[0].rank
      // oow.textContent = ((response.data[0].wins / (response.data[0].wins + response.data[0].losses))*100).toFixed(2)
      // win.textContent = response.data[0].wins
      // lose.textContent = response.data[0].losses
      const data = response.data[0];
      setTier(`${data.tier} ${data.rank}`);
      setOow(((data.wins / (data.wins + data.losses)) * 100).toFixed(2));
      setWin(data.wins);
      setLose(data.losses);

      // 소환사 랭크이미지
      const tierImgSrc = `https://opgg-static.akamaized.net/images/medals_new/${data.tier}.png?image=q_auto,f_webp,w_144&v=168491990`;
      setTierImgSrc(tierImgSrc); // 상태 업데이트로 이미지 소스 변경
      // const tierImg = document.querySelector(".tier img")
      // tierImg.setAttribute("src", `https://opgg-static.akamaized.net/images/medals_new/${data.tier}.png?image=q_auto,f_webp,w_144&v=168491990`);
      // const tierImg = document.querySelector(".tier img")
      // tierImg.setAttribute("src", `https://opgg-static.akamaized.net/images/medals_new/${response.data[0].tier}.png?image=q_auto,f_webp,w_144&v=168491990`)

    } catch (error) {
      console.error("Error fetching league data:", error);
      alert("리그 정보를 가져오는 중에 오류가 발생했습니다.");
    }
  };
  // 이미지 변환 안됨
  // useEffect(() => {
  //   if (summonerData) {
  //     const tierImgSrc = `https://opgg-static.akamaized.net/images/medals_new/${summonerData.tier}.png?image=q_auto,f_webp,w_144&v=168491990`;
  //     setTierImgSrc(tierImgSrc);

  //     const profileImgSrc = `https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon${summonerData.profileIconId}.jpg?image=q_auto,f_webp,w_auto&v=1684436046850`;
  //     setProfileImgSrc(profileImgSrc);
  //   }
  // }, [summonerData]);

  // useEffect(() => {
  //   if (tierImgRef.current && tierImgSrc) { // tierImgRef와 tierImgSrc가 모두 존재할 때만 실행
  //     tierImgRef.current.setAttribute("src", tierImgSrc);
  //   }
  // }, [tierImgSrc]); // tierImgSrc가 변경될 때만 실행

  // 20게임 
  let TOP = 0
  let JUNGLE = 0
  let MID = 0
  let BOTTOM = 0
  let SUPPORT = 0
  let ARAM = 0

  // 20개 게임 리셋
  // const gameReset = document.querySelector("#games")
  // gameReset.innerHTML = ""

  // 매치 API 불러오기
  const matchInfo = async () => {


    try {
      const matchAPI = `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${summonerPuuid}/ids?start=0&count=20&api_key=${apiKey}`
      let games20 = await axios.get(matchAPI)
      console.log("매치정보 호출");
      console.log(games20);

      // const matchIds = response.data;

      // 매치 ID로 매치 검색 - API호출
      let gameAPI = []
      for (let i = 0; i <= 19; i++) {
        gameAPI.push(`https://asia.api.riotgames.com/lol/match/v5/matches/${games20.data[i]}?api_key=${apiKey}`)
      }

      // 20개 게임 데이터 
      for (let k = 0; k <= 19; k++) {
        let game = await axios.get(gameAPI[k])

        console.log(`<${k}, 번 째 게임>`)
        console.log(game)

        // 게임 내에서 i 찾는 코드
        let myNumber
        for (let i = 0; i <= 9; i++) {
          if (summonerPuuid == game.data.metadata.participants[i]) {
            myNumber = i
            console.log("내 번호 = ", myNumber)
            break
          }
        }
        // html코드 변환해야할곳
        const games20In = document.querySelector("#games")

        let child
        child = document.createElement("div")
        child.classList.add("game")
        let textColor = document.querySelector("#game-type-result")

        // 승 패 처리
        // 승리 조건
        if (game.data.info.participants[myNumber].win == true) {
          // 테두리색
          child.style.borderBlockColor = "blue"
          child.style.borderInlineColor = "blue"
          child.style.boxShadow = "1px 10px 30px blue"
          WIN += 1
          if (game.data.info.gameMode == "CLASSIC") {
            child.innerHTML =
              `
            <div id="game-type-result">
              <div id="type">클래식</div>
              <div id="result">승리</div>
            </div>
            `
          }
          else {
            child.innerHTML =
              `
            <div id="game-type-result">
              <div id="type">칼바람</div>
              <div id="result">승리</div>
            </div>
            `
          }
        }
        // 패배 조건
        else if (game.data.info.participants[myNumber].win == false && game.data.info.participants[myNumber].champLevel >= 3) {
          // 테두리 색
          child.style.borderBlockColor = "red"
          child.style.borderInlineColor = "red"
          child.style.boxShadow = "1px 10px 30px red"
          LOSE += 1
          if (game.data.info.gameMode == "CLASSIC") {
            child.innerHTML =
              `
            <div id="game-type-result">
              <div id="type">클래식</div>
              <div id="result">패배</div>
            </div>
            `
          }
          else {
            child.innerHTML =
              `
            <div id="game-type-result">
              <div id="type">칼바람</div>
              <div id="result">패배</div>
            </div>
            `
          }
        }
        // 무승부 조건
        else if (game.data.info.participants[myNumber].win == false && game.data.info.participants[myNumber].champLevel <= 3) {
          // 테두리 색
          child.style.borderBlockColor = "gray"
          child.style.borderInlineColor = "gray"
          child.style.boxShadow = "1px 10px 30px gray"
          DRAW += 1
          if (game.data.info.gameMode == "CLASSIC") {
            child.innerHTML =
              `
              <div id="game-type-result">
                <div id="type">클래식</div>
                <div id="result">무승부</div>
              </div>
              `
          }
          else {
            child.innerHTML =
              `
              <div id="game-type-result">
                <div id="type">칼바람</div>
                <div id="result">무승부</div>
              </div>
              `
          }
        }
        // 라인 계산
        // if (game.data.info.participants[myNumber].individualPosition == "TOP") {
        //   TOP += 1
        //   topCount.innerHTML = TOP
        // }
        // else if (game.data.info.participants[myNumber].individualPosition == "JUNGLE") {
        //   JUNGLE += 1
        //   jungleCount.innerHTML = JUNGLE
        // }
        // else if (game.data.info.participants[myNumber].individualPosition == "MID") {
        //   MID += 1
        //   midCount.innerHTML = MID
        // }
        // else if (game.data.info.participants[myNumber].individualPosition == "BOTTOM") {
        //   BOTTOM += 1
        //   bottomCount.innerHTML = BOTTOM
        // }
        // else if (game.data.info.participants[myNumber].individualPosition == "SUPPORT") {
        //   SUPPORT += 1
        //   supportCount.innerHTML = SUPPORT
        // }
        // else {
        //   ARAM += 1
        //   aramCount.innerHTML =ARAM
        // }
      }


    } catch (error) {
      console.error("Error fetching match data:", error);
      alert("매치 정보를 가져오는 중에 오류가 발생했습니다.");
    }

  };


  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="flex justify-center items-center w-full h-full">
        <input className="w-1/2 h-10 border rounded-lg"
          type="text"
          // value={summonerName}
          ref={summonerNameRef}
          // onChange={(e) => setSummonerName(e.target.value)}
          placeholder="소환사 이름"
        />
        <button className="w-20 h-10 mx-3 border rounded-lg bg-sky-300 hover:bg-sky-100" onClick={handleSearch}>검색</button>
      </div>
      <div name="info">
        <div name="haedProFile">
          <div name="profileImg">
            {/* <img className="w-32" src="https://media.tenor.com/dFsURp-wUdgAAAAM"/> */}
            <img className="w-32" src="https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5766.jpg?image=q_auto,f_webp,w_auto&v=1684436046850" alt=""></img>
          </div>
          <div name="userInfo">
            {summonerData && (
              <div>
                <div name="userLevel">
                  <h3>레벨: {summonerData.summonerLevel}</h3>
                </div>
                <div name="userName">
                  <h3>{summonerData.name}</h3>
                </div>
              </div>
            )}
          </div>
          <div name="tier">
            {/* <img className="w-52" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c7d54994-bed2-4020-8745-3a225e0f78d2/da9kvy4-cc5f9bfe-6bd7-44ad-9"></img> */}
            <img className="w-52" src="https://opgg-static.akamaized.net/images/medals_new/challenger.png?image=q_auto,f_webp,w_144&v=168491990"></img>
            <div name="tierName-and-percent">
              <div id="tierName">
                <h3>challenger</h3>
              </div>
              <div id="percent">
                <h3><span id="win">80</span>승 <span id="lose">20</span>패(<span id="win-lose-percent">80</span>%)</h3>
              </div>
            </div>
          </div>
          <div name="mostplay-and-positions20">
            <div name="mostplay">
              <div name="mostplay1">
                <img src="https://opgg-static.akamaized.net/meta/images/lol/14.3.1/champion/Garen.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160,h_160&v=1707283412529" alt="" />
                <h3><span name="most1">15</span>판</h3>
              </div>
              <div name="mostplay2">
                <img src="https://opgg-static.akamaized.net/meta/images/lol/14.3.1/champion/Seraphine.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160,h_160&v=1707283412529" alt="" />
                <h3><span name="most2">15</span>판</h3>
              </div>
              <div name="mostplay3">
                <img src="https://opgg-static.akamaized.net/meta/images/lol/14.3.1/champion/TwistedFate.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto,f_webp,w_160,h_160&v=1707283412529" alt="" />
                <h3><span name="most3">15</span>판</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div name="main">
        <div id="games">

        </div>
      </div>
      {/* <script src="https://cdn.jsdeliver.net/npm/axios/.min.js"></script> */}
      {/* {summonerData && (
        <div>
          <h2>{summonerData.name}</h2>
          <p>레벨: {summonerData.summonerLevel}</p>
          다른 필요한 소환사 정보를 표시할 수 있습니다.
          <p>{summonerData.profileIconId}</p>
        </div>
      )} */}
    </div>
  );
};

export default APISearch;

// 갑자기 summonerData에 있는 summonerLevel,name 못 읽음 원인 모르겠음