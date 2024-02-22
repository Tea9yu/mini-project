import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function BoardView() {
  // const [boardList, setBoardList] = useState([]);
  let seq = useParams().seq;
  console.log("seq", seq)
  const navigate = useNavigate();
  const updateTitle = useRef();
  const updateContent = useRef();
  const updateWriter = useRef();
  const updateSeq = useRef();
  const [boardView, setBoardView] = useState([]);

  const [boardCmts, setBoardCmts] = useState([]);
  const [reple, setReple] = useState([]);
  
  

  const getBoardView = async () => {
    const resp = await axios.get(`http://10.125.121.170:8080/board/${seq}`);  // 게시글 상세데이터 할당
    setBoardView(resp.data)
    console.log("resp", resp.data)
    // setBoardView("resp", resp)
    // fetch(`http://10.125.121.170:8080/board/${seq}`)
    //   .then(response => response.json())
    //   .then(json => console.log(json))
    //   .catch(error => console.log(error));
  }
  const getBoardCmts = async () => {
    const cmts = await axios.get(`http://10.125.121.170:8080/board/${seq}/comments`);
    setBoardCmts(cmts.data)
    console.log("cmt", cmts.data)
  }

  // 게시글 삭제하기
  const handleDelete = () => {
    if (window.confirm("삭제하시겠습니까?")){
      axios.delete(`http://10.125.121.170:8080/board/${seq}`, {})
        .then(resp => {
          alert("삭제되었습니다.");
          navigate(`/list`);
        })
        .catch(err => console.log(err));
    }
  }

  // 게시글 수정하기
  const handleUpdate = () => {
    if (updateTitle.current.value === "" || updateContent.current.value === "" || updateWriter.current.value === "") {
      alert("수정할 항목을 입력해주세요");
      return;
    }
    
    if (window.confirm("수정하시겠습니까?")) {
      axios.put(`http://10.125.121.170:8080/board`, {
        seq:seq,
        title: updateTitle.current.value,
        content: updateContent.current.value,
        writer: updateWriter.current.value
      }, {
        headers: {
          "Content-type": `application/json`
        }
      })
      .then(resp => {
        alert("수정되었습니다.");
        navigate(`/view/${seq}`);
      })
      .catch(err => {
        console.log(err);
        alert("게시글 수정 실패");
      });
    }
  }
  // const BoardEdit = async () => {
  //   const edit = await axios.put(`http://10.125.121.170:8080/board/${seq}`);
    
  // }
  const [isUpdate, setIsUpdate] = useState(false);

  const handleClickEdit = (e) => {
    setIsUpdate(true);
  }

  useEffect(() => {
    console.log('useEffect');
    getBoardView();
  }, []);  

  useEffect(() => {
    console.log("useEffect", boardView)
    
  }, [boardView]);

  useEffect(() => {
    // console.log("cmt", boardCmts)
    getBoardCmts();
  }, []);

  useEffect(() => {
    console.log("boardCmts", boardCmts)

    let cmt = boardCmts.map((item) =>
            <tr className="flex justify-center items-center w-full h-full border">
                <td className="flex justify-center items-center w-1/2 h-full">{item.cmt_content}</td>
                <td className="flex justify-center items-center w-1/3 h-full">{item.cmt_writer}</td>
                <td className="flex justify-center items-center w-1/2 h-full">{item.createDate.replace('T', ' ')}</td>
            </tr>
        )
        setReple(cmt);
    
  }, [boardCmts]);

  return (
    <div className="flex flex-col justify-center items-center">
      게시판 목록 출력
      <form className="w-1/2">
        <table>
          <tbody>
            <tr>
              <div className="w-full h-full">
                <div className="flex 1 0 auto">
                  <div className="border flex justify-center items-center w-20" ref={updateSeq} name="seq" defaultValue={boardView.seq}>번호</div>
                  <div className="border flex justify-center items-center w-20">
                    {boardView.seq}
                  </div>
                  <div className="border flex justify-center items-center w-20">작성자</div>
                  {/* <input type="text" className="border flex justify-center items-center w-20" ref={updateWriter} name="writer" defaultValue={boardView.writer}/> */}
                  {isUpdate ? 
                    // 수정 가능속성
                    <input className="flex border justify-center items-center flex-grow" type="text" ref={updateWriter} name="title" defaultValue={boardView.writer} />
                    //  수정 불가능 속성
                    : <input className="flex border justify-center items-center flex-grow" type="text" ref={updateWriter} name="title" value={boardView.writer} />
                  }       
                  <div className="border flex justify-center items-center w-20">작성일</div>
                  <div className="border flex justify-center items-center w-44">{boardView.createDate}</div>
                  <div className="border flex justify-center items-center w-20">조회수</div>
                  <div className="border flex justify-center items-center w-20 flex-grow">{boardView.cnt}</div>
                </div>
                <div className="flex">
                  <div className="border flex justify-center items-center w-20 py-2">제목</div>
                  <div className="border flex justify-center items-center flex-grow">
                  {/* <input className="flex justify-center items-center flex-grow" ref={updateTitle} type="text" name="title" defaultValue={boardView.title} /> */}
                    {isUpdate ? 
                    // 수정 가능속성
                    <input className="flex justify-center items-center flex-grow" type="text" ref={updateTitle} name="title" defaultValue={boardView.title} />
                    //  수정 불가능 속성
                    : <input className="flex justify-center items-center flex-grow" type="text" ref={updateTitle} name="title" value={boardView.title} />
                  }                    
                  </div>
                </div>
                <div className="flex">
                  <div className="border flex justify-center items-center w-20">내용</div>
                  <div className="border flex justify-center items-center py-5 flex-grow">
                    {/* <input className="flex justify-center items-center flex-grow" ref={updateContent} type="text" name="content" defaultValue={boardView.content} /> */}
                    {isUpdate ? 
                    // 수정 가능속성
                    <input className="flex justify-center items-center flex-grow" type="text"  ref={updateContent} name="title" defaultValue={boardView.content} />
                    //  수정 불가능 속성
                    : <input className="flex justify-center items-center flex-grow" type="text" ref={updateContent} name="title" value={boardView.content} />
                  }   
                  </div>
                </div>
                <div>
                  <Link to={`/cmt`}><div>댓글</div></Link>
                  <input className="flex justify-center items-center flex-grow" type="text" name="reple" value={reple.cmt_content} />
                  <button>작성</button>
                  {reple}
                  
                  
                </div>
                <div className="">
                  <div className="flex justify-center items-center mt-3">
                    {isUpdate?
                    <Link><button className="bg-sky-400 rounded-lg text-white p-2" type="button" onClick={handleUpdate}>제출</button></Link>
                    :
                    <Link><button className="bg-sky-400 rounded-lg text-white p-2" type="button" onClick={handleClickEdit}>수정</button></Link>
                  }
                    
                    &nbsp;&nbsp; | &nbsp;&nbsp;
                    <Link><button className="bg-sky-400 rounded-lg text-white p-2" type="button" onClick={handleDelete}>삭제</button></Link>
                    &nbsp;&nbsp; | &nbsp;&nbsp;
                    <Link to={`/list`}><button className="bg-sky-400 rounded-lg text-white p-2">목록</button></Link>
                  </div>
                </div>
              </div>
            </tr>
          </tbody>
        </table>
      </form>

    </div>
  );
};

