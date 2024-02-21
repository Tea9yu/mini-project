import axios from "axios";
import { useState, useRef } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"

export default function BoardWrite() {
  const navigate = useNavigate();

  const title = useRef();
  const content = useRef();
  const writer = useRef();

  
  const postClick = () => {
    console.log("postClick", postClick);
    if (title.current.value === "" || content.current.value === "" || writer.current.value === "") {
      alert("제목, 내용, 작성자를 입력하세요");
      return;
    }
    
    if (window.confirm("게시글을 등록하시겠습니까?")) {
      axios.post(`http://10.125.121.170:8080/board`,  {
        title: title.current.value,
        content: content.current.value,
        writer: writer.current.value
      },
        {
          headers: {
            "Content-type": `application/json`
          }
        }
      ).then((res) => {
        alert("게시글 등록 성공");
        navigate("/list");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 등록 실패");
      });
    }

  }

  // const [on, setOn] = useState();

  // const [text, setText] = useState({
  //   title: "",
  //   writer: "",
  //   content: ""
  // })

  // const { title, writer, content } = text;

  // // console.log(text);
  // const onChange = (e) => {    
  //   setText({
  //     ...text,
  //     [e.target.name]: e.target.value
  //   });
  // }

  // const onReset = () => {
  //   // setText("");
  //   setText({
  //     title: "",
  //     writer: "",
  //     content: ""
  //   });
  // }

  // const onWrite = () => {
  //   console.log("message--------------------------");
    // axios.post(`http://10.125.121.170:8080/board`,
    //   {
    //     'title': text.title,
    //     'writer' : text.writer,
    //     'content' : text.content
    //   },
    //   {headers : {
    //     "Content-type" : `application/json`
    //   }
    // }
    // )
    // .then((res) => {
    //   console.log(res);
    //   document.location.href = '/list'
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  //   setOn(text);
  // }




  return (
    <div className="w-full h-full">
      <form className="flex flex-col justify-center items-center h-full">
        <table className="w-auto h-auto">
          <tbody>
            <td className="flex flex-col">제목</td>
            <input className="border w-full" type="text" ref={title} placeholder="제목을 입력해주세요" />
            {/* <td className="flex flex-col">
              <input className="border w-full" type="text" name="title" placeholder="제목을 입력해주세요"/>
            </td> */}
          </tbody>
          <tbody>
            <td className="flex flex-col">작성자</td>
            <input className="border w-full h-full" ref={writer} placeholder="작성자를 입력해주세요"></input>
          </tbody>
          <tbody>
            <td className="flex flex-col">내용</td>
            <textarea className="border w-full h-full" ref={content} placeholder="내용을 입력해주세요"></textarea>
            {/* <td className="flex flex-col">
              <textarea className="border w-full h-full"name="content" placeholder="내용을 입력해주세요"></textarea>
            </td> */}
          </tbody>
          <tbody>
            <div>
              <button onClick={postClick} type="button">작성</button>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <button type="submit">취소</button>
              &nbsp;&nbsp; | &nbsp;&nbsp;
              <Link to={`/list`}><button type="button" value="목록 ">목록</button></Link>
            </div>
          </tbody>
        </table>
      </form>
      <div>
       
      </div>
    </div>
  )
}
