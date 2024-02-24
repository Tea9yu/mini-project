import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import CommentWrite from "../comment/CommentWrite";
import Comment from "../comment/Comment";

export default function BoardDetail() {
    let seq = useParams().seq;
    console.log("seq", seq)
    const navigate = useNavigate();
    const updateTitle = useRef();
    const updateContent = useRef();
    const updateWriter = useRef();
    const password = useRef();

    const [isUpdate, setIsUpdate] = useState(false);

    const [boardDetail, setBoardDetail] = useState([]);
    const [boardCmts, setBoardCmts] = useState([]);
    const [reple, setReple] = useState([]);


    const getBoardDetail = async () => {
        const resp = await axios.get(`http://10.125.121.170:8080/board/${seq}`);  // 게시글 상세데이터 할당
        setBoardDetail(resp.data)
        console.log("resp", resp.data)

    }
    const getBoardCmts = async () => {
        const cmts = await axios.get(`http://10.125.121.170:8080/board/${seq}/comments`);
        setBoardCmts(cmts.data)
        console.log("cmt", cmts.data)
    }

    // 게시글 삭제하기
    const handleDelete = (e) => {
        e.preventDefault();
        if (!isUpdate) {
            setIsUpdate(true);
            return;
        }

        if (password && password.current.value === "") {
            alert("비밀번호를 입력해주세요");
            return;
        }

        if (window.confirm("삭제하시겠습니까?")) {
            axios.delete(`http://10.125.121.170:8080/board`,
                {
                    data: {
                        seq: seq,
                        password: password.current.value
                    }
                }, {
                headers: {
                    "Content-type": `application/json`
                }

            }).then(resp => {
                if (resp.data === "삭제 성공") {
                    alert("삭제되었습니다.");
                    navigate(`/list`);
                } else {
                    alert("삭제 실패!");
                }
            })
                .catch((err) => {
                    console.log(err);
                    alert("에러가 발생했습니다!");
                });

            // console.log("seq확인", seq)
        }
    }

    // 게시글 수정하기
    const handleUpdate = (e) => {

        e.preventDefault();
        if (!isUpdate) {
            setIsUpdate(true);
            return;
        }

        console.log("value", updateTitle.current.value, updateContent.current, password.current.value)
        // return

        console.log("value", updateTitle.current.value, updateContent.current.value, updateWriter.current.value, password.current.value)
        if (updateTitle.current.value === "" || updateContent.current.value === "" || updateWriter.current.value === "" || password.current.value === "") {
            alert("수정할 항목을 입력해주세요");
            return;
        }

        if (window.confirm("게시글을 수정하시겠습니까?")) {
            axios.put(`http://10.125.121.170:8080/board`, {
                seq: seq,
                title: updateTitle.current.value,
                content: updateContent.current.value,
                writer: updateWriter.current.value,
                password: password.current.value
            }, {
                headers: {
                    "Content-type": `application/json`
                }
            })
                .then(resp => {
                    if (resp.data === "게시판 업데이트 완료"){
                    alert("수정되었습니다.");
                    setIsUpdate(false);
                    window.location.reload();
                    } else {
                        alert("게시글 수정 실패");
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("에러가 발생했습니다!");
                });
        }
    }
    const handleClickEdit = (e) => {
        setIsUpdate(true);
    }

    useEffect(() => {
        console.log('useEffect');
        getBoardDetail();
    }, []);


    useEffect(() => {
        console.log("useEffect", boardDetail)

    }, [boardDetail]);

    useEffect(() => {

        getBoardCmts();
    }, []);

    useEffect(() => {
        console.log("boardCmts", boardCmts)

        let cmt = boardCmts.map((item) =>
            <Comment item={item} />
        )
        setReple(cmt);

    }, [boardCmts]);


    return (
        <div className="flex flex-col justify-center items-center mt-5">
            <div className="mb-5">
                게시판 상세 페이지
            </div>
            <div name="음영 테두리" className="flex items-center relative overflow-x-auto w-3/4 shadow-md sm:rounded-lg bg-green-50 border-2 border-green-200 justify-center">
                <form className="mt-10 justify-center items-center">
                    {/* <table>
                        <tbody>
                            <tr> */}
                    <div className="w-full h-full">

                        {/* 제목 */}
                        <div className="flex">
                            <div className="border flex justify-center items-center w-20 py-2">제목</div>
                            <div className="border flex justify-center items-center flex-grow">
                                {/* <input className="flex justify-center items-center flex-grow bg-green-50" ref={updateTitle} type="text" name="title" defaultValue={boardDetail.title} /> */}
                                {isUpdate ?
                                    // 수정 가능속성
                                    <input className="flex justify-center items-center flex-grow bg-green-50" type="text" ref={updateTitle} name="title" defaultValue={boardDetail.title} />
                                    //  수정 불가능 속성
                                    : <div className="flex justify-center items-center flex-grow bg-green-50">{boardDetail.title}</div>
                                }
                                {isUpdate ?
                                    // 수정 가능속성
                                    <input className="flex border justify-center items-center flex-grow" ref={password} placeholder="  비밀번호" type="password" name="password" />
                                    //  수정 불가능 속성
                                    : <div>{''}</div>}
                            </div>
                        </div>

                        {/* 작성자, 작성일, 조회수 */}
                        <div className="flex auto">
                            <div className="border flex justify-center items-center w-20">작성자</div>
                            {/* <input type="text" className="border flex justify-center items-center w-20 bg-green-50" ref={updateWriter} name="writer" defaultValue={boardDetail.writer} /> */}
                            {isUpdate ?
                                // 수정 가능속성
                                <input className="border flex justify-center items-center w-20 bg-green-50" type="text" ref={updateWriter} name="writer" defaultValue={boardDetail.writer} />
                                //  수정 불가능 속성
                                : <div className="border flex justify-center items-center w-20 bg-green-50" >{boardDetail.writer} </div>
                            }
                            <div className="border flex justify-center items-center w-20">작성일</div>
                            <div className="border flex justify-center items-center w-44 ">{boardDetail.createDate}</div>
                            <div className="border flex justify-center items-center w-20">조회수</div>
                            <div className="border flex justify-center items-center w-20 flex-grow">{boardDetail.cnt}</div>
                        </div>



                        <div className="flex">
                            <div className="border flex justify-center items-center w-20">내용</div>
                            <div className="border flex justify-center items-center py-5 flex-grow">
                                {/* <input className="flex justify-center items-center flex-grow bg-green-50" ref={updateContent} type="text" name="content" defaultValue={boardDetail.content} /> */}
                                {isUpdate ?
                                    // 수정 가능속성
                                    <input className="flex justify-center items-center flex-grow bg-green-50 border border-b-slate-500" type="text" ref={updateContent} name="content" defaultValue={boardDetail.content} />
                                    //  수정 불가능 속성
                                    : <div className="flex justify-center items-center flex-grow bg-green-50" >{boardDetail.content}</div>
                                }

                            </div>
                        </div>

                        {/* 제일 밑에 수정, 삭제, 목록 버튼 */}
                        <div>
                            <div className="my-7">
                                <div className="flex justify-center items-center mt-3">
                                    {/* <Link><button className="bg-green-400 rounded-lg text-white p-2" type="button" onClick={handleUpdate}>제출</button></Link> */}
                                    {isUpdate ?
                                        <button className="bg-green-400 rounded-lg text-white p-2" type="button" onClick={handleUpdate}>제출</button>
                                        :
                                        <button className="bg-green-400 rounded-lg text-white p-2" type="button" onClick={handleClickEdit}>수정</button>
                                    }
                                    &nbsp;&nbsp; | &nbsp;&nbsp;
                                    <Link><button className="bg-green-400 rounded-lg text-white p-2" type="button" onClick={handleDelete}>삭제</button></Link>
                                    &nbsp;&nbsp; | &nbsp;&nbsp;
                                    <Link to={`/list`}><button className="bg-green-400 rounded-lg text-white p-2">목록</button></Link>
                                </div>
                            </div>
                            {/* 댓글목록*/}
                            <div className="mt-10 mb-5">댓글</div>
                            {reple}

                            {/* 댓글작성 */}
                            {/* <div className="flex mt-10 ">
                      <div className="ml-5">
                        <input className="flex border justify-center items-center flex-grow" placeholder="  닉네임" type="text" name="reple" value={reple.cmt_content} />
                        <input className="flex border justify-center items-center flex-grow" placeholder="  비밀번호" type="text" name="reple" value={reple.cmt_content} />
                      </div>
                      <input className="flex border justify-center items-center flex-grow" placeholder="  댓글 입력" type="text" name="reple" value={reple.cmt_content} />
                      <button className="border border-green-900 bg-green-400 rounded-lg text-white ml-2 px-2 py-2">작성</button>
                    </div> */}

                        </div>



                    </div>
                    {/* </tr>
                        </tbody>
                    </table> */}
                    <CommentWrite seq={seq} />
                </form>




            </div>


        </div>
    );
};

