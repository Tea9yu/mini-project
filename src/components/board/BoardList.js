import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import './paginate.css';

export default function BoardList() {
    const [boardList, setBoardList] = useState([]);
    const [boardTag, setBoardTag] = useState([]);
    const [page, setPage] = useState(1);
    const [totalNum, setTotalNum] = useState(0);


    const getBoardList = async () => {
        const resp = await axios.get(`http://10.125.121.170:8080/board?pageNo=1`); // 2) 게시글 목록 데이터에 할당  
        setTotalNum(resp.data.totalElements);
        setBoardList(resp.data.content); // 3) boardList 변수에 할당
        console.log("resp", resp.data.content);
        console.log("boardList", boardList);
        // fetch(`http://10.125.121.170:8080/board`)
        //   .then(response => response.json())
        //   .then(json => setBoardList(json))
        //   .catch(error => console.log(error));

        // const pngn = resp.pagination;
        // console.log("pngn", pngn);
        console.log("totalNum", totalNum)

    }

    // 페이지 변경
    const handlePageChange = (page) => {
        setPage(page);
    }

    // 페이지 변경 했을 때
    useEffect(() => {

        axios.get(`http://10.125.121.170:8080/board?pageNo=${page}`, {})
            .then(resp => {
                setBoardList(resp.data.content);
            })

    }, [page])



    useEffect(() => {
        let n = 1
        getBoardList(n); // 1) 게시글 목록 조회 함수 호출
    }, []);

    useEffect(() => {
        console.log("useEffect", boardList);



        let tag = boardList.map((item) =>


            <tr className="flex justify-center items-center w-full h-full border">
                <Link to={`/view/${item.seq}`} className="flex border justify-center items-center w-1/3 h-full">{item.seq}</Link>
                <Link to={`/view/${item.seq}`} className="flex border justify-center items-center w-full h-full">{item.title}</Link>
                <td className="flex border justify-center items-center w-1/2 h-full">{item.writer}</td>
                <td className="flex border justify-center items-center w-1/2 h-full">{item.createDate.slice(0, 10)}</td>
                <td className="flex border justify-center items-center w-1/3 h-full">{item.cnt}</td>
            </tr>
        )
        setBoardTag(tag);
        // console.log("tag", tag);

    }, [boardList]);
    return (
        <div>
            <h1 className="flex flex-col justify-center items-center w-full h-full">게시판 목록</h1>
            <form>
                <table className="flex flex-col justify-center items-center border">
                    <tr className="flex flex-col items-center justify-center w-full h-full">
                        <td className="flex gap-2 justify-center items-center w-full h-full">
                            <select name="searchField">
                                <option value="title">제목</option>
                                <option value="content">작성자</option>
                            </select>
                            <input className="border" type="text" name="searchWord" />
                            <input className="border" type="submit" value="검색하기" />
                            <Link to={`/write`}><button className="border rounded-lg" type="submit" value="글쓰기">글쓰기</button></Link>
                        </td>
                    </tr>
                </table>
            </form>
            <table className="table-auto flex flex-col justify-center items-center border w-full h-full">
                <tr className="flex justify-center items-center border w-full h-full">
                    <th className="flex border justify-center items-center w-1/3 h-full">번호</th>
                    <th className="flex border justify-center items-center w-full h-full">제목</th>
                    <th className="flex border justify-center items-center w-1/2 h-full">작성자</th>
                    <th className="flex border justify-center items-center w-1/2 h-full">작성일</th>
                    <th className="flex border justify-center items-center w-1/3 h-full">조회수</th>
                </tr>
                {boardTag}
            </table>
            <div className="flex flex-col justify-center items-center">
                <Pagination 
                    activePage={page}   // 현재 페이지
                    itemsCountPerPage={10}  // 한 페이지에 보여줄 아이템 갯수
                    totalItemsCount={totalNum}  // 총 아이템 갯수
                    pageRangeDisplayed={5}  // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
                >
                </Pagination>
            </div>
            {/* <table className="border w-full h-full">
                <div>
                    <div>
                        <Link to={`/write`}><button className="border rounded-lg" type="submit" value="글쓰기">글쓰기</button></Link>
                    </div>
                </div>
            </table> */}
            {/* <ul>
                {boardList.map((board) => (
                    // 4) map 함수로 데이터 출력
                    <li key={board.idx}>
                        <Link to={`/board/${board.seq}`}>{board.title}</Link>
                    </li>
                ))}
            </ul> */}
        </div>
    )
}
// 구현해야 될것
/* 
글쓰기 버튼 누르면 작성폼으로 이동 구현
글 제목 누르면 게시판 상세보기 구현
글 상단에 검색기능 구현
*/
