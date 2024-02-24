import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Comment({ item }) {

    const cmt_content = useRef();
    const password = useRef();


    const navigate = useNavigate();

    const [isUpdate, setIsUpdate] = useState(false);

    console.log("item=", item.cmt_id);

    // 댓글 수정하기
    const handleCmtUpdate = (e) => {
        e.preventDefault();
        if (cmt_content.current.value === "" || password.current.value === "") {
            alert("수정할 항목을 입력해주세요");
            return;
        }

        if (window.confirm("댓글을 수정하시겠습니까?")) {
            axios.put(`http://10.125.121.170:8080/board/comments`, {
                cmt_id: item.cmt_id,
                cmt_content: cmt_content.current.value,
                password: password.current.value
            }, {
                headers: {
                    "Content-type": `application/json`
                }
            })
                .then((res) => {
                    if (res.data === "업데이트 성공") {
                    alert("수정되었습니다.");
                    setIsUpdate(false);
                    window.location.reload();
                    } else {
                        alert("댓글 수정 실패!");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    alert("에러가 발생했습니다!");
                });

        }

    }
    const handleCmtClickEdit = (e) => {
        e.preventDefault();
        setIsUpdate(true);
    }

    // 댓글 삭제하기
    const handleCmtDelete = (e) => {
        e.preventDefault();
        if (!isUpdate) {
            setIsUpdate(true);
            return;
        }
        console.log("pw",password.current.value);
        console.log("ID",item.cmt_id);

        if (password && password.current.value === "") {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (!password) {
            alert("삭제 실패")
            return
        }
        const inputs ={
            cmt_id: item.cmt_id,                   
            password: password.current.value,
        }
        if (window.confirm("삭제하시겠습니까?")) {
            axios.delete(`http://10.125.121.170:8080/board/comments`, {
                inputs
            })
                .then(resp => {
                    console.log(inputs)
                    alert("삭제되었습니다.");
                    setIsUpdate(false);
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(inputs)
                    console.log(err)
                    alert("에러가 발생했습니다!");
                });

        }
    }
    return (
        <div>
            <div className="flex flex-col w-full h-full border">
                <div className="flex flex-row justify-between space-x-6 ">
                    <div className="flex justify-center items-center h-full">{item.cmt_writer}</div>
                    {isUpdate ?
                        // 수정 가능속성
                        <input className="flex border justify-center items-center flex-grow" ref={password} placeholder="  비밀번호" type="password" name="password" />
                        //  수정 불가능 속성
                        : <div>{''}</div>}
                    <div className="flex justify-center items-center  h-full">{item.createDate}</div>
                </div>
                <div className="flex flex-row justify-between space-x-6 ">
                    <div className="flex justify-center items-center  h-full">
                        {isUpdate ?
                            // 수정 가능속성
                            <input className=" bg-green-50 border border-b-slate-500" type="text" ref={cmt_content} name="title" defaultValue={item.cmt_content} />
                            //  수정 불가능 속성
                            : <div>{item.cmt_content}</div>}
                    </div>

                    <div>
                        {isUpdate ?
                            <button className="bg-green-400 rounded-lg text-white p-2" onClick={handleCmtUpdate}>등록</button>

                            :
                            <button className="bg-green-400 rounded-lg text-white p-2" onClick={handleCmtClickEdit}>수정</button>

                        }
                        <button className="bg-green-400 rounded-lg text-white p-2" onClick={handleCmtDelete}>삭제</button>
                    </div>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}
