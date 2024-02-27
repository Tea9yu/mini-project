import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";


export default function CommentWrite({ seq }) {

    // let seq = useParams().seq;
    console.log("Comment2", seq);
    const [boardCmts, setBoardCmts] = useState([]);
    const [reple, setReple] = useState([]);

    const cmt_writer = useRef();
    const cmt_content = useRef();
    const password = useRef();
 
    // 댓글 작성하기
    const postCmtClick = () => {
        // console.log("postCmtClick", postCmtClick);
        if (cmt_writer.current.value === "" || cmt_content.current.value === "" || password.current.value === "") {
            alert("닉네임, 비밀번호, 내용을 입력하세요.");
            return; // 빈 값이 있을 경우 댓글 작성 중단
        }

        if (window.confirm("댓글을 작성하시겠습니까?")) {
            axios.post(`http://10.125.121.170:8080/board/${seq}/comments`, {
                cmt_writer: cmt_writer.current.value,
                cmt_content: cmt_content.current.value,
                password: password.current.value
            }, {
                headers: {
                    "Content-type": `application/json`
                }
            })
                .then((res) => {
                    alert("댓글 작성 성공");
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    alert("댓글 작성 실패");
                });
        }

    }
    

    return (
        <div>
            <div className="pb-5 flex mt-10 ">
                <div className="ml-5">
                    {/* {isUpdate ?
                        // 수정 가능속성
                        <input className="flex border justify-center items-center flex-grow" ref={cmt_writer} placeholder="  닉네임" type="text" name="reple" value={reple.cmt_writer} />
                        //  수정 불가능 속성
                        : <input className="flex border justify-center items-center flex-grow" ref={cmt_writer} placeholder="  닉네임" type="text" name="reple" value={reple.cmt_writer} />
                    } */}
                    <input className="outline-none flex border justify-center items-center flex-grow" ref={cmt_writer} placeholder="  닉네임" type="text" name="reple" value={reple.cmt_writer} />
                    <input className="outline-none flex border justify-center items-center flex-grow" ref={password} placeholder="  비밀번호" type="password" name="reple" value={reple.password} />
                </div>
                <input className="outline-none flex border justify-center items-center flex-grow" ref={cmt_content} placeholder="  댓글 입력" type="text" name="reple" value={reple.cmt_content} />
                <button className="border border-orange-900 bg-orange-400 rounded-lg text-white ml-2 px-2 py-2" type="button" onClick={postCmtClick} >작성</button>
                
            </div>
        </div>
    )

}
