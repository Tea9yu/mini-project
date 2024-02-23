import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";


export default function Comment({ seq }) {

    // let seq = useParams().seq;
    console.log("Comment", seq);
    const [boardCmts, setBoardCmts] = useState([]);
    const [reple, setReple] = useState([]);

    const [isUpdate, setIsUpdate] = useState(false);

    const navigate = useNavigate();

    const cmt_writer = useRef();
    const cmt_content = useRef();
    const password = useRef();

    // 댓글 작성하기
    const postCmtClick = () => {
        console.log("postCmtClick", postCmtClick);
        if (cmt_writer.current.value === "" || cmt_content.current.value === "" || password.current.value === "") {
            alert("닉네임, 비밀번호, 내용을 입력하세요.");
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
                    navigate(`/view/${seq}`);
                })
                .catch((err) => {
                    console.log(err);
                    alert("댓글 작성 실패");
                });
        }

        // 댓글 수정하기

        const handleCmtUpdate = () => {
            if (cmt_writer.current.value === "" || cmt_content.current.value === "" || password.current.value === "") {
                alert("수정할 항목을 입력해주세요");
                return;
            }

            if (window.confirm("댓글을 수정하시겠습니까?")) {
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
                        alert("댓글 수정 성공");
                        navigate(`/view/${seq}`);
                    })
                    .catch((err) => {
                        console.log(err);
                        alert("댓글 수정 실패");
                    });

            }

        }
        const handleCmtClickEdit = (e) => {
            setIsUpdate(true);
        }


        // const getBoardCmts = async () => {
        //     // const cmts = await axios.get(`http://10.125.121.170:8080/board/${seq}/comments`);
        //     // setBoardCmts(cmts)
        //     // console.log("cmt", cmts)
        // }

        // // useEffect(() => {
        // //     // console.log("cmt", boardCmts)
        // //     getBoardCmts();
        // // }, []);

        // useEffect(() => {
        //     console.log("boardCmts", boardCmts)

        //     let cmt = boardCmts.map((item) =>
        //         <tr className="flex justify-center items-center w-full h-full border">
        //             <td className="flex justify-center items-center w-1/2 h-full">{item.cmt_content}</td>
        //             <td className="flex justify-center items-center w-1/3 h-full">{item.cmt_writer}</td>
        //             <td className="flex justify-center items-center w-1/2 h-full">{item.createDate}</td>
        //         </tr>
        //     )
        //     setReple(cmt);

        // }, [boardCmts]);



        return (
            <div>
                {/* <div>
                {reple}
            </div>
            <form>
                <div className='flex flex-col '>
                    <div className='flex'>
                        <input type="text" className="py-2 px-3 block w-1/5 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="작성자" />
                        <input type="text" className="py-2 px-3 block w-1/5 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="비밀번호" />
                        <button className='border'>등록</button>
                        <button className='border'>수정</button>
                        <button className='border'>삭제</button>
                    </div>
                </div>
                <div>
                    <input type="text" class="p-4 sm:p-5 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="댓글을 작성하세요" />

                </div>
            </form> */}
                <div className="mt-10 mb-5">댓글3</div>
                {/* {reple} */}

                {/* 댓글작성 */}
                <div className="flex mt-10 ">
                    <div className="ml-5">
                        <input className="flex border justify-center items-center flex-grow" ref={cmt_writer} placeholder="  닉네임ss" type="text" name="reple" value={reple.cmt_content} />
                        <input className="flex border justify-center items-center flex-grow" ref={password} placeholder="  비밀번호" type="text" name="reple" value={reple.cmt_content} />
                    </div>
                    <input className="flex border justify-center items-center flex-grow" ref={cmt_content} placeholder="  댓글 입력" type="text" name="reple" value={reple.cmt_content} />
                    <button className="border border-green-900 bg-green-400 rounded-lg text-white ml-2 px-2 py-2" type="button" onClick={postCmtClick} >작성</button>
                    {isUpdate ?
                        <button className="bg-green-400 rounded-lg text-white p-2" type="button" onClick={handleCmtUpdate}>등록</button>
                        :
                        <button className="bg-green-400 rounded-lg text-white p-2" type="button" onClick={handleCmtClickEdit}>수정</button>
                    }
                </div>
            </div>
        )
    }
}
