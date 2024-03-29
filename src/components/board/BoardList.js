import axios from "axios";
import { useEffect, useState , useRef} from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import './paginate.css';

export default function BoardList() {
    const [boardList, setBoardList] = useState([]);
//   const [trs, setTrs] = useState();
  const rfDt = useRef();
  const [boardTag, setBoardTag] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNum, setTotalNum] = useState(0);
 
  const getBoardList = async (pgno) => {
    const resp = await axios.get(`http://10.125.121.170:8080/board?pageNo=${pgno}`); // 게시글 목록 데이터에 할당  
    setTotalNum(resp.data.totalElements);
    setBoardList(resp.data.content); // boardList 변수에 할당

    console.log("resp", resp.data.content);
    console.log("boardList", boardList);
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
    let n= 1
    getBoardList(n); // 게시글 목록 조회 함수 호출
}, []);


// ----------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------


 // 실제 값 들어가는 부분
useEffect(() => {

    let tag = boardList.map((item) =>

        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-green-100 hover:text-stone-950 hover:font-bold dark:hover:bg-gray-600">

          <td className="px-6 py-4">
            <span className="inline-flex justify-center items-center w-5 h-5 bg-slate-500 text-white rounded-md mx-2">
            <Link to={`/view/${item.seq}`} >{item.seq}</Link>
            </span> 
          </td> 

          <td>
            <Link to={`/view/${item.seq}`} >{item.title}</Link>
          </td>

          <td className="px-6 py-4">
            {item.writer}
          </td>

          <td className="px-6 py-4">
            {item.createDate.slice(0, 10)}
          </td>

          <td className="px-6 py-4 ">
            {item.cnt}
          </td>

        </tr>
        
        )
        setBoardTag(tag);
      
  }, [boardList]);

  return (
    <div className="container mx-auto h-screen">
      <div className="flex flex-col justify-center items-center w-full h-full">


        {/* 제일 상단.  검색창, 글 작성하기  */}
        <div className="flex m-4 bg-green-400" >
            <form>
                <table className="flex flex-col justify-center items-center border">
                    <tr className="flex flex-col items-center justify-center w-full h-full">
                        <td className="flex gap-2 justify-center items-center w-full h-full">
                            {/* 검색 할 때  */}
                            <select className="ml-1.5" name="searchField">
                                <option value="title">제목</option>
                                <option value="content">작성자</option>
                            </select>

                            {/* 검색 */}
                            <input className="border border-green-500 border-solid border-4" type="text" name="searchWord" />
                            <input className="border border-green-500 border-solid border-4" type="submit" value="검색하기" />
                            <Link to={`/write`}><button className="border rounded-lg border-green-500 border-solid border-4" type="submit" value="글쓰기">글쓰기</button></Link>
                        </td>
                    </tr>
                </table>
            </form>
        </div>


        {/* 컬럼 이름 */}

        <div className="relative overflow-x-auto w-3/4 shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  번호
                </th>
                <th scope="col" className="px-6 py-3">
                  제목
                </th>
                <th scope="col" className="px-6 py-3">
                  작성자
                </th>
                <th scope="col" className="px-6 py-3">
                  날짜
                </th>
                <th scope="col" className="px-6 py-3">
                  조회수
                </th>
              </tr>
            </thead>


            {/* tbody는 데이터 본문 10줄 */}
            {<tbody>        
              {boardTag}
            </tbody>}

          </table>
        </div>

        {/* 페이지 기능 */}
        <div className="flex flex-col justify-center items-center pt-2">
                <Pagination 
                    activePage={page}   // 현재 페이지
                    itemsCountPerPage={10}  // 한 페이지에 보여줄 아이템 갯수
                    totalItemsCount={totalNum}  // 총 아이템 갯수
                    pageRangeDisplayed={5}  // paginator의 페이지 범위
                    prevPageText={"‹"} // "이전"을 나타낼 텍스트
                    nextPageText={"›"} // "다음"을 나타낼 텍스트
                    onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
                />
        </div>


      </div>
    </div>
  )
}