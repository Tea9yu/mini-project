import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BoardList() {
    const [boardList, setBoardList] = useState([]);
    const [boardTag, setBoardTag] = useState([]);

    
    const getBoardList = async () => {
        const resp = await axios.get(`http://10.125.121.170:8080/board`, {}); // 2) 게시글 목록 데이터에 할당  
        setBoardList(resp.data); // 3) boardList 변수에 할당
        console.log(boardList);
        // fetch(`http://10.125.121.170:8080/board`)
        //   .then(response => response.json())
        //   .then(json => setBoardList(json))
        //   .catch(error => console.log(error));        

    }

    
    
    useEffect(() => {
        getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);

    useEffect(() => {
        console.log(boardList);
        
        let tag = boardList.map((item) =>                     
                    <tr className="flex justify-center items-center w-full h-full border">
                        <Link to='/View' className="flex border justify-center items-center w-1/3 h-full">{item.seq}</Link>
                        <Link to='/View' className="flex border justify-center items-center w-full h-full">{item.title}</Link>
                        <td className="flex border justify-center items-center w-1/2 h-full">{item.writer}</td>
                        <td className="flex border justify-center items-center w-1/3 h-full">{item.cnt}</td>
                        <td className="flex border justify-center items-center w-1/2 h-full">{item.createDate}</td>
                    </tr>                           
        )
        setBoardTag(tag);
        console.log(tag);

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
                                    <option value="content">내용</option>
                                </select>
                                <input className="border" type="text" name="searchWord" />
                                <input className="border" type="submit" value="검색하기" />
                            </td>
                        </tr>
                    </table>
                </form> 
                <table className="flex flex-col justify-center items-center border w-full h-full">
                    <tr className="flex justify-center items-center border w-full h-full">
                        <th className="flex border justify-center items-center w-1/3 h-full">번호</th>
                        <th className="flex border justify-center items-center w-full h-full">제목</th>
                        <th className="flex border justify-center items-center w-1/2 h-full">작성자</th>
                        <th className="flex border justify-center items-center w-1/3 h-full">조회수</th>
                        <th className="flex border justify-center items-center w-1/2 h-full">작성일</th>
                    </tr>                    
                        {boardTag}                    
                </table>
                <table className="border w-full h-full">
                    <tr>
                        <td>
                            <button className="border" type="submit" value="글쓰기">글쓰기</button>
                        </td>
                    </tr>
                </table>            
        </div>
    )
}
// 구현해야 될것
/* 
글쓰기 버튼 누르면 작성폼으로 이동 구현
글 제목 누르면 게시판 상세보기 구현
글 상단에 검색기능 구현
*/
