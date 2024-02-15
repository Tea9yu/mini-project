import React, { useState, useRef } from "react";
import axios from "axios";

const SummonerSearch = () => {
  const [summonerData, setSummonerData] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [leagueData, setLeagueData] = useState(null);
  const summonerNameRef = useRef();

  const apiKey = process.env.REACT_APP_API_KEY;

  const handleSearch = async () => {
    const summonerName = summonerNameRef.current.value.trim();

    try {
      if (!summonerName) {
        alert("소환사 이름을 입력하세요.");
        return;
      }

      const { data: summonerInfo } = await axios.get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(
          summonerName
        )}?api_key=${apiKey}`
      );

      const { id: accountId, name, summonerLevel } = summonerInfo;

      setSummonerData({ name, summonerLevel });

      const { data: matchList } = await axios.get(
        `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${apiKey}`
      );

      const recentMatches = matchList.matches.slice(0, 5);
      setMatchData(recentMatches);

      const { data: leagueEntries } = await axios.get(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${accountId}?api_key=${apiKey}`
      );

      const soloRank = leagueEntries.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
      setLeagueData(soloRank);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("데이터를 불러오는 중에 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center">
        <input
          className="w-1/2 h-10 border rounded-lg"
          type="text"
          ref={summonerNameRef}
          placeholder="소환사 이름"
        />
        <button
          className="w-20 h-10 mx-3 border rounded-lg bg-blue-500 text-white hover:bg-blue-700"
          onClick={handleSearch}
        >
          검색
        </button>
      </div>

      {summonerData && (
        <div className="mt-5">
          <h2 className="text-lg font-bold">{summonerData.name}</h2>
          <p>레벨: {summonerData.summonerLevel}</p>
        </div>
      )}

      {leagueData && (
        <div className="mt-5">
          <h3 className="text-lg font-bold">티어 정보</h3>
          <p>리그: {leagueData.tier} {leagueData.rank}</p>
          <p>LP: {leagueData.leaguePoints}</p>
          <p>승리/패배: {leagueData.wins}승 {leagueData.losses}패</p>
        </div>
      )}

      <div className="mt-5">
        <h3 className="text-lg font-bold">최근 매치 목록</h3>
        <ul className="list-disc ml-5">
          {matchData.map((match, index) => (
            <li key={index}>{match.gameId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SummonerSearch;
