import { useState,useEffect } from "react";
import Board from "./Board";
import { useParams } from "react-router-dom";



export default function BoardView() {
  const seq = useParams().seq;
  const [boardView, setBoardView] = useState([]);  
  const [board, setBoard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBoardView = async () => {    
    // fetch(`http://10.125.121.170:8080/board/${seq}`)
    //   .then(response => response.json())
    //   .then(json => setBoardView(json))
    //   .catch(error => console.log(error));
    try {
      const response = await fetch(`http://10.125.121.170:8080/board/${seq}`);
      if (!response.ok) {
        throw new Error('게시판 정보를 불러오는데 실패했습니다.');
      }
      const data = await response.json();
      setBoardView(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
}

useEffect(() => {
  getBoardView();
}, []);
// useEffect(() => {
//   console.log(boardView)

//   // let view = boardView.map
// }, [boardView]);
if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

  return (
    <div>
      <Board boards={boardView.boards} />
      <h1>게시판 상세 보기</h1>
      <BoardView boardView={boardView} />
    </div>
  )
}
