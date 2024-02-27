import axios from "axios";
import { useState, useRef } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"

export default function BoardWrite() {
  const navigate = useNavigate();

  const title = useRef();
  const content = useRef();
  const writer = useRef();
  const password = useRef();


  const postClick = () => {
    console.log("postClick", postClick);
    if (title.current.value === "" || content.current.value === "" || writer.current.value === "" || password.current.value === "") {
      alert("제목, 내용, 작성자, 비밀번호를 입력하세요");
      return;
    }

    if (window.confirm("게시글을 등록하시겠습니까?")) {
      axios.post(`http://10.125.121.170:8080/board`, {
        title: title.current.value,
        content: content.current.value,
        writer: writer.current.value,
        password: password.current.value
      },
        {
          headers: {
            "Content-type": `application/json`
          }
        }
      ).then((res) => {
        alert("게시글 등록 성공");
        navigate("/list");
        // console.log(res);
      })
        .catch((err) => {
          console.log(err);
          alert("게시글 등록 실패");
        });
    }

  }



  return (
    <div className="flex flex-col justify-center items-center bg-orange-50 h-svh ">
      <div className="text-center bg-orange-50">
        게시글 작성 페이지
      </div>
      <div className="flex flex-col w-5/6 mt-10 mx-auto max-w-screen-sm items-center shadow-md sm:rounded-lg bg-orange-50 border-2 border-orange-200 justify-center">
        <form className="flex flex-col justify-center items-center my-5 mx-5">
          <table className="w-auto h-auto">
            <tbody className="flex mb-5">
              <td className="flex flex-col">작성자</td>
              <input maxLength={20} className="outline-none w-45 flex ml-1 items-center relative overflow-x-auto shadow-md sm:rounded-lg bg-orange-50 border-2 border-orange-200 justify-center" ref={writer} placeholder="닉네임"></input>              
              <input className="outline-none w-40 flex ml-10 items-center relative overflow-x-auto shadow-md sm:rounded-lg bg-orange-50 border-2 border-orange-200 justify-center" ref={password} type="password" placeholder="비밀번호"></input>
            </tbody>
            <tbody className="flex mb-5">
              <td className="flex">제목</td>
              <input maxLength={20} className="outline-none w-96 ml-5 items-center relative overflow-x-auto max-w-lg shadow-md sm:rounded-lg bg-orange-50 border-2 border-orange-200 justify-center" type="text" ref={title} placeholder="제목을 입력해주세요" />
              {/* <td className="flex flex-col ml-5">작성자</td>
            <input className="w-24 flex ml-1 items-center relative overflow-x-auto shadow-md sm:rounded-lg bg-orange-50 border-2 border-orange-200 justify-center" ref={writer} placeholder="닉네임"></input> */}
            </tbody>
            <tbody className="flex">
              <td>내용</td>
              <textarea className="outline-none h-80 w-96 mb-5 ml-5 flex items-center relative overflow-x-auto shadow-md sm:rounded-lg bg-orange-50 border-2 border-orange-200 justify-center" ref={content} placeholder="내용을 입력해주세요"></textarea>
            </tbody>
            {/* 작성, 취소, 목록 버튼 */}
            <tbody className="text-center">
              <div>
                <button onClick={postClick} type="button" className="bg-orange-400 rounded-lg text-white p-2">작성</button>
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <button type="submit" className="bg-orange-400 rounded-lg text-white p-2">취소</button>
                &nbsp;&nbsp; | &nbsp;&nbsp;
                <Link to={`/list`}><button type="button" value="목록" className="bg-orange-400 rounded-lg text-white p-2">목록</button></Link>
              </div>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  )
}
