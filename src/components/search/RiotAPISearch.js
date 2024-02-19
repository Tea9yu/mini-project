import React, { useState, useRef } from "react";
import axios from "axios";


const RiotAPISearch = () => {
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState(null);

  const summonerNameRef = useRef();

  const apiKey = process.env.REACT_APP_API_KEY;

  console.log("Riot");

  const checkKorean = (str) => {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    return korean.test(str);
  }


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
      {summonerData && (
        <div>
          <h2>{summonerData.name}</h2>
          <p>레벨: {summonerData.summonerLevel}</p>
          {/* 다른 필요한 소환사 정보를 표시할 수 있습니다. */}
          <p>{summonerData.profileIconId}</p>
        </div>
      )}
    </div>
  );
};

export default RiotAPISearch;
