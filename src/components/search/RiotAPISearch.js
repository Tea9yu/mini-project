import React, { useState, useRef } from "react";
import axios from "axios";


const RiotAPISearch = () => {
  const [summonerName, setSummonerName] = useState("");
  const [summonerData, setSummonerData] = useState(null);

  const summonerNameRef = useRef();

  console.log("Riot");

  const checkKorean = (str) => {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
 
    return korean.test(str);
  }


  const handleSearch = async () => {
    console.log(summonerNameRef.current.value);

    const sr = summonerNameRef.current.value ;
    setSummonerName(sr);
    try {
      if (!sr) {
        alert("소환사 이름을 입력하세요.");
        return;
      }

      const apiKey = process.env.REACT_APP_API_KEY;
      // const encodedSummonerName = encodeURIComponent(summonerName); // 한글 닉네임을 인코딩합니다.
      let url = '' ;
      if (checkKorean(sr)) {
        url = encodeURI(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sr}?api_key=${apiKey}`) ;
      }
      else {
        url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sr}?api_key=${apiKey}`;
      }
 
      // Riot API Key를 적절한 값으로 변경해야 합니다.
      console.log(url);
      const response = await axios.get(
        url
        // `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`
        // `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/Hide%20on%20bush?api_key=RGAPI-2b65aefc-e9cf-4c0b-8a83-e03eca73679a`
      );

      // console.log(response.data);
      setSummonerData(response.data);
    } catch (error) {
      console.error("Error fetching summoner data:", error);
      alert("소환사 정보를 가져오는 중에 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div>
        <input 
          type="text"
          // value={summonerName}
          ref={summonerNameRef}
          // onChange={(e) => setSummonerName(e.target.value)}
          placeholder="소환사 이름"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      {summonerData && (
        <div>
          <h2>{summonerData.name}</h2>
          <p>레벨: {summonerData.summonerLevel}</p>
          {/* 다른 필요한 소환사 정보를 표시할 수 있습니다. */}
        </div>
      )}
    </div>
  );
};

export default RiotAPISearch;
