import React, { useState, useRef } from "react";
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
  
  
  // const tier = document.querySelector()
  // const oow = document.querySelector()
  // const win = document.querySelector()
  // const lose = document.querySelector()

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

      // 소환사 랭크이미지
      const tierImg = document.querySelector(".tier img")
      tierImg.setAttribute("src", `https://opgg-static.akamaized.net/images/medals_new/${response.data[0].tier}.png?image=q_auto,f_webp,w_144&v=168491990`)

    } catch (error) {
      console.error("Error fetching league data:", error);
      alert("리그 정보를 가져오는 중에 오류가 발생했습니다.");
    }
  };

  // 매치 API 불러오기
  const matchInfo = async () => {
    // const gameReset = document.querySelector(".games")
    // gameReset.innerHTML = ""

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
          if(summonerPuuid == game.data.metadata.participants[i]) {
            myNumber = i
            console.log("내 번호 = ", myNumber)
            break
          }
        }
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
              <div name="tierName">
                <h3>challenger</h3>
              </div>
              <div name="percent">
                <h3><span name="win">80</span>승 <span name="lose">20</span>패(<span name="win-lose-percent">80</span>%)</h3>
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
        <div name="games">

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